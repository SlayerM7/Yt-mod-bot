const { MessageEmbed } = require('discord.js');

module.exports.config = {
    name: "modlogs",
    description: "Get all recent modlogs done on a user by a moderator",
    group: 'moderation',
    permissions: ['MANAGE_MESSAGES'],
    usage: '.modlogs [@user]',
    example: '.modlogs @Slayer'
}

module.exports.run = async(client, message, args) => {
    const member = message.mentions.members.last() ? message.mentions.members.last() : args[0];

    if (!member) return message.channel.send(client.main);

    let mm ;
    
    try {
    if (member === args[0]) mm = await message.guild.members.fetch(args[0]); else mm = await message.mentions.members.last();
    } catch { }

    if (!mm) return message.channel.send(client.noMember);

    const modlogs = require('../../database/userlogs.json')

    if (!modlogs[mm.id]) {
        if (!modlogs[mm.id][message.guild.id]) {
            return message.channel.send(client.noUserDB)
        }
        return message.channel.send(client.noUserDB)
    }

    let ding = await Object.entries(modlogs[mm.id][message.guild.id]).map(pair => `**ID: ${pair[0]} | Moderator: ${pair[1].mod}** \n  Type: ${pair[1].type} - ${pair[1].date} \n`);

    const mainEmbed = new MessageEmbed()
    .setAuthor(mm.user.username,mm.user.displayAvatarURL())
    .setColor(client.color)
    .setAuthor(`Found ${Object.keys(modlogs[mm.id][message.guild.id]).length} modlog cases for ${mm.user.username}` ,mm.user.displayAvatarURL({dynamic: true}))
    .setDescription(ding)

    message.channel.send(mainEmbed);
}



























































































































































/**
 * const { MessageEmbed } = require('discord.js');

module.exports.config = {
    name: "modlogs",
    description: "Get all recent modlogs done on a user by a moderator",
    group: 'moderation',
    permissions: ['MANAGE_MESSAGES'],
    usage: '.modlogs [@user]',
    example: '.modlogs @Slayer'
}

module.exports.run = async(client, message, args) => {
    const member = message.mentions.members.last() ? message.mentions.members.last() : args[0];

    if (!member) return message.channel.send(client.main);

    let mm ;
    
    try {
    if (member === args[0]) mm = await message.guild.members.fetch(args[0]); else mm = await message.mentions.members.last();
    } catch { }

    if (!mm) return message.channel.send(client.noMember);

    const modlogs = require('../database/userlogs.json')

    if (!modlogs[mm.id]) {
        if (!modlogs[mm.id][message.guild.id]) {
            return message.channel.send(client.noUserDB)
        }
        return message.channel.send(client.noUserDB)
    }

    const curLogs = modlogs[mm.id][message.guild.id].logs;

    const mainEmbed = new MessageEmbed()
    .setAuthor(mm.user.username,mm.user.displayAvatarURL())
    .setColor(client.color)
    .setDescription(`\`${curLogs}\` total modlogs found`)

    message.channel.send(mainEmbed);
}
 */