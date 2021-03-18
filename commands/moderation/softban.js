const { Client, Message, MessageEmbed, User } = require("discord.js");
const fs = require('fs')

module.exports.config = {
    name: "softban",
    aliases: ['soft-ban'],
    group: 'moderation',
    description: "Softban a user",
    usage: '.softban [@user] <reason>',
    example: '.softban @Slayer Spamming messages',
    permissions: ['BAN_MEMBERS']
}

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {*} args 
 */

module.exports.run = async (client, message, args) => {
    const user = message.mentions.members.last() ? message.mentions.members.last() : args[0];

    if (!user) return message.channel.send(client.main)

    let mm;
    try {
        if (user === args[0]) mm = await message.guild.members.fetch(args[0]); else mm = await message.mentions.members.last();
    } catch { }

    if (!mm) return message.channel.send(client.noMember);

    if (mm.id === client.user.id) return message.channel.send(client.main)

    const reason = args.slice(1).join(' ') ? args.slice(1).join(' ') : "No reason given";

    message.guild.members.ban(mm.id, { reason: reason, days: 7 }).then(() => {
        message.guild.members.unban(mm.id);

        client.userlogs(mm.id, message.guild.id, 'softban', message);

        const softBanned = new MessageEmbed()
            .setColor(client.color)
            .setDescription(`${client.successColor} _${mm.user.username} has been soft banned | ${reason}_`)

        message.channel.send(softBanned);

    }).catch((e) => {
        console.log(e)
        const failed = new MessageEmbed()
            .setColor(client.failColor)
            .setDescription(`${client.fail} _Failed to ban ${mm.user.username}_`)
        message.channel.send(failed)
    })

}