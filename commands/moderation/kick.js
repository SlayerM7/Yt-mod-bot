const { Message, Client, MessageEmbed } = require("discord.js");
const fs = require('fs');

module.exports.config = {
    name: "kick",
    aliases: ['k'],
    usage: "kick [@user] <reason>",
    example: ".kick @Slayer Shitposting in chat",
    permissions: ['KICK_MEMBERS'],
    botperms: ['EMBED_LINKS', "KICK_MEMBERS"],
    group: "moderation",
    description: "Kick mentioned member",
    guildOnly: true
};

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {*} args 
 */

module.exports.run = async(client, message, args) => {
   const member = message.mentions.members.last() ? message.mentions.members.last() : args[0];

   if (!member) return message.channel.send(client.main);

   const reason = args.slice(1).join(' ') ? args.slice(1).join(' ') : "No reason given"

   let mm ;
   try {
   if (member === args[0]) mm = await message.guild.members.fetch(args[0]); else mm = await message.mentions.members.last();
   } catch {}
   if (!mm) return message.channel.send(client.noMember);


   if (mm.id === client.user.id) return message.channel.send(client.main)

   if (mm.roles.highest.position > message.member.roles.highest) {
       if (message.member.id !== message.guild.ownerID) {
       return message.channel.send(client.higherRole);
       }
   }

   if (mm.hasPermission('MANAGE_MESSAGES')) return message.channel.send(client.userstaff);

   mm.kick(reason).then(() => {

    client.userlogs(mm.id, message.guild.id, 'kick', message);

       const kicked = new MessageEmbed()
       .setColor(client.successColor)
       .setDescription(`${client.success} _${mm.user.username} has been kicked_`)
       message.channel.send(kicked);
   }).catch(() => {

    const failed = new MessageEmbed()
    .setColor(client.failColor)
    .setDescription(`${client.fail} _Failed to kick ${mm.user.username}_`)

       message.channel.send(failed);
   })
}