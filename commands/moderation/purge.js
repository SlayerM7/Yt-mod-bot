const { Client, Message, MessageAttachment } = require("discord.js");

const { fetchTranscript } = require("reconlx");


module.exports.config = {
    name: "purge",
    description: "Mass delete messages in a channel",
    usage: '.purge [amount]',
    group: 'moderation',
    example: '.purge 50',
    permissions: ['MANAGE_MESSAGES']
}

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {*} args 
 * @returns 
 */

module.exports.run = async(client, message, args) => {
    let amount = Number(args[0]);

    if (!amount) return message.channel.send(client.main);

    if (isNaN(amount)) return message.channel.send(client.main)

    if (amount >= 100) amount = 99

    message.channel.bulkDelete(amount)

    message.channel.send(`Purged ${amount} messages`).then((msg) => {
        msg.react('📰')
        let done = false;
        setTimeout(() => {
            done = true
            msg.reactions.removeAll()
        }, 10 * 1000)
        client.on('messageReactionAdd', async(reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (user.id !== message.author.id) return;
            if (reaction.message.id === msg.id) {
                msg.edit(`<@${user.id}> Please wait well i generate the transcript`)
                message.channel.send('Generating transcript..').then((m) => {
            
                fetchTranscript(message, amount).then(async(data) => {
                    m.edit('Formating transcript..')
                    const file = new MessageAttachment(data, `${message.channel.id}.html`);
                    message.channel.send(file).then(() => {
                        m.delete();
                        msg.edit(`Purged ${amount} messages`)
                    })
                    try {
                    await msg.reactions.removeAll()
                    } catch {}
                  });
                })
            }
        })
    })
}