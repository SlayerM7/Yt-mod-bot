const { Client, Message, MessageEmbed } = require('discord.js');

module.exports.config = {
    name: 'bots',
    description: 'Get a list og all bots in the server',
    group: 'utility', 
    cooldown: 10
}
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    module.exports.run = async(client, message, args) => {
        const bots = [];
        message.guild.members.cache.filter(member => member.user.bot).forEach((bot) => {
            bots.push(`${bot.user.username} - ${bot.id}`)
        })
        message.channel.send(client.createEmbed('main',`${bots.join('\n')}`, false, []))
    }
