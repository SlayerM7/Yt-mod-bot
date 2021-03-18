const { Client, Message, MessageEmbed } = require('discord.js');

module.exports.config = {
    name: 'simjoin',
    description: 'Simulate when a user will join the server',
    group: 'utility',
    cooldown: 10,
    permissions: ['ADMINISTRATOR']
}
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    module.exports.run = async(client, message, args) => {

        const ww = require('../../database/welcome.json');

        if (!ww[message.guild.id] ) {
            message.channel.send(
                new MessageEmbed()
                .setColor(client.failColor)
                .setDescription(`${client.fail} You have no welcome channel set, I cannot simulate `)
            ) 
            return;
        } 

        client.emit('guildMemberAdd', message.member)

        message.reply(
            new MessageEmbed()
            .setColor(client.successColor)
            .setDescription(`${client.success} Successfully simulated a join`)
            )

    }
