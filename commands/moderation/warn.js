const { v4 } = require('uuid')

const fs = require('fs')

const { Client, Message, MessageEmbed } = require('discord.js');

module.exports.config = {
    name: "warn",
    description: "Warn a user",
    permissions: ['MANAGE_MESSAGES'],
    botperms: ['EMBED_LINKS'],
    group: 'moderation',
    aliases: ['w'],
    guildOnly: true,
    usage: '.warn [@user] <reason>',
    example: '.warn @Slayer Weirdo boy'
}

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {*} args 
 */

module.exports.run = async(client, message, args) =>  {
    const file = require('../../database/warns.json');
    const uInput = message.mentions.members.last() ? message.mentions.members.last() : args[0];

    if (!uInput) return message.channel.send(client.main)

    let mm ;
    try {
    if (uInput === args[0]) mm = await message.guild.members.fetch(args[0]); else mm = await message.mentions.members.last();
    } catch {
    }
  
   if (!mm) return message.channel.send(client.noMember);

   if (mm.id === client.user.id) return message.channel.send(client.main);

   if (mm.hasPermission("MANAGE_MESSAGES")) return message.channel.send(client.userstaff);


   const reason = args.slice(1).join(' ') ? args.slice(1).join(' ') : "No reason given";

   if (!file[message.guild.id]) {
       file[message.guild.id] = {}

       fs.writeFile('./database/warns.json', JSON.stringify(file, null, 2), (err) => {
       if (err) { }
    })
   } 

   if (!file[message.guild.id][mm.id]) {
       file[message.guild.id][mm.id] = {}

       fs.writeFile('./database/warns.json', JSON.stringify(file, null, 2), (err) => {
        if (err) { }
    })
   }

    file[message.guild.id][mm.id][v4()] = { 
        reason: reason,
        mod: message.author.tag,
        date: new Date().toUTCString()
    }

    fs.writeFile('./database/warns.json', JSON.stringify(file, null, 2), (err) => {
        if (err) { }
    })

    client.userlogs(mm.id, message.guild.id, 'warn', message)

         
    const doneIt = new MessageEmbed()
    .setColor(client.successColor)
    .setDescription(`${client.success} _${mm.user.username} has been warned | ${reason}_`)

    message.channel.send(doneIt);
}