const { Client, Message, MessageEmbed } = require('discord.js');

module.exports.config = {
    name: 'test',
    description: 'test',
    group: 'misc', 
}
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    module.exports.run = async(client, message, args) => {
        let member = await client.multipleGets (message, 'channel', args, 0)
    
        if (!member) return message.channel.send('Yikes')

        message.reply(member.name);
    }   
