const { Client, Message, MessageEmbed } = require('discord.js');

module.exports.config = {
    name: 'blacklist',
    description: 'Blacklist a user from the bot',
    group: 'owners',
    ownerOnly: true,
    usage: '.blacklist [@user || id]', 
    example: '.blacklist @Slayer'
}
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    module.exports.run = async(client, message, args) => {
       if (!args[0]) return message.channel.send(client.main)
        const member = await client.users.fetch(args[0])


       const file = require('../../database/blacklisted.json')

       file[member.id] = {
        author: message.author.tag,
        date: new Date().toUTCString()
       }

       client.writeFile('blacklisted.json', file)



       return message.channel.send(client.createEmbed('success', `Blacklisted ${member.username}`, false))
    }

