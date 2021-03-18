const { Message, Client, MessageEmbed } = require("discord.js");
const fs = require('fs')
module.exports.config = {
    name: "ban",
    aliases: ['b'],
    usage: "ban [@user] <reason>",
    example: [".ban @Slayer Shitposting in chat", '.ban 812420747136860241 Stop spamming u weirdo'],
    permissions: ['BAN_MEMBERS'],
    botperms: ['EMBED_LINKS', "KICK_MEMBERS"],
    group: "moderation",
    description: "Bans mentioned member",
    guildOnly: true,
    cooldown: 10
};

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {*} args 
 */

module.exports.run = async(client, message, args) => {
   const member = message.mentions.members.first() ? message.mentions.members.first() : args[0];

   if (!member) return message.channel.send(client.main);

   const reason = args.slice(1).join(' ') ? args.slice(1).join(' ') : "No reason given"

   let mm ;
   try {
   if (member === args[0]) {
        mm = await message.guild.members.fetch(args[0]);
   } else mm = await message.mentions.members.last();
} catch {

}

   if (!mm) return message.channel.send(client.noMember);

   if (mm.id === client.user.id) return message.channel.send(client.main)


    if (message.guild.members.cache.has(mm.id)) {
   if (mm.roles.highest.position > message.member.roles.highest) {
       if (message.member.id !== message.guild.ownerID) {
       return message.channel.send(client.higherRole);
       }
    }
   if (mm.hasPermission('MANAGE_MESSAGES')) return message.channel.send(client.userstaff);
    }

    const { confirmation } = require("reconlx");

    const areUSURE = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`_Are you sure you want to ban ${mm.user.username}?_`)

    message.reply(areUSURE).then(async msg => {

      const emoji = await confirmation(msg, message.author, ["✅", "❌"], 30000);

      if (emoji === '✅') {

   message.guild.members.ban(mm.id, {reason: reason}).then(() => {

    client.userlogs(mm.id, message.guild.id, 'ban', message);

       const kicked = new MessageEmbed()
       .setColor(client.successColor)
       .setDescription(`${client.success} _${mm.user.username} has been banned_`)
       message.channel.send(kicked);
   }).catch((e) => {
    console.log(e)
    const failed = new MessageEmbed()
    .setColor(client.failColor)
    .setDescription(`${client.fail} _Failed to ban ${mm.user.username}_`)

       message.channel.send(failed);
   })
} else {
   message.delete()
   msg.delete();
   return;
}
})
}