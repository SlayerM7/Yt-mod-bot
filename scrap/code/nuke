const { Client, Message, MessageEmbed } = require("discord.js");

module.exports.config = {
    name: 'nuke',
    group: 'moderation',
    description: 'Nuke a channel so all messages are gone',    
    usage: '.nuke <#channel>',
    example: '.nuke #spam',
}

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {*} args 
 * @returns
 */

module.exports.run = async(client, message, args) => {
    const channel = message.mentions.channels.first() ? message.mentions.channels.first() : args[0]

    if (!channel) return message.channel.send(client.main)


    let ch ;

    try {
    if (channel === args[0]) {
        ch = message.guild.channels.cache.get(channel)
    } else {
        ch = message.guild.channel.cache.get(channel.id)
    }
} catch {

}

if (!ch) return message.channel.send(client.noChannel)


ch.clone().then(async(c) => {
 c.setPosition(ch.position).then(() => {

    const nuked = new MessageEmbed()
    .setColor(client.color)
    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
    .setImage('https://media.discordapp.net/attachments/720812237794574347/765218830418182204/200.gif?width=269&height=150')

    c.send(nuked);
 })
})

ch.delete();

}
