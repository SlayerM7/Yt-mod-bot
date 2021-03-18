const { MessageEmbed } = require('discord.js');

module.exports.config = {
    name: "delwarn",
    description: "Delete a warning from a user",
    group: 'moderation',
    usage: '.delwarn [@user] <amount>',
    permissions: ['MANAGE_MESSAGES'],
}

module.exports.run = async(client, message, args) =>{
    const user = message.mentions.users.last() ? message.mentions.users.last() : args[0];

    if (!user) return message.channel.send(client.main);

    let mm;
    try {
    if (user === args[0]) mm = await message.guild.members.fetch(args[0]); else mm = await message.mentions.members.last();
    } catch { };

    if (!mm) return message.channel.send(client.noMember);

    if (!message.member.hasPermission("MANAGE_GUILD")) {

    if (mm.id === message.author.id) return message.channel.send(client.cantDelOwnWarn)
    }

    const warns  = require('../../database/warns.json');

  

    const warn = args[1];

    if (!warn) return message.channel.send(client.main);

    if (!warns[message.guild.id]) {
        if (!warns[message.guild.id][mm.id]) {
            return message.channel.send(client.userNoWarns)
        }
        return message.channel.send(client.userNoWarns);
    }

    if (!warns[message.guild.id][mm.id][warn]) {
        const unknownWarn = new MessageEmbed()
        .setColor(client.failColor)
        .setDescription(`${client.fail} Unknown warning`)
        return message .channel.send(unknownWarn);
    }

    delete warns[message.guild.id][mm.id][warn];

    const fs = require('fs')

    fs.writeFile('./database/warns.json', JSON.stringify(warns, null, 2), (err) => {

    })


    client.userlogs(mm.id, message.guild.id, 'delete warning', message)

    const delWarned = new MessageEmbed()
    .setColor(client.successColor)
    .setDescription(`${client.success} Deleted \`${warn}\` warning`)

    message.channel.send(delWarned);

}