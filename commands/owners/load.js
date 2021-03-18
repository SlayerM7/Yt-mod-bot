const { Client, Message, MessageEmbed } = require('discord.js');

module.exports.config = {
    name: 'load',
    description: 'Load a unloaded command',
    group: 'owners',
    usage: '.load [command]', 
    example: '.load ban',
    ownerOnly: true
}
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    module.exports.run = async(client, message, args) => {
        const cmd = args[0];

        if (!cmd) return message.channel.send(client.main)

        if (!client.unloads[cmd]) {
            return message.reply('That command is already loaded')
        };

        const c = client.unloads[cmd].dir.config

        client.commands.set(c.name, client.unloads[cmd].dir)
    

        try {
            c.aliases.forEach(alias => {
                client.aliases.set(alias, c.name);
            });
        } catch {

        }

        delete client.unloads[cmd]

        message.reply(`Loaded \`${cmd}\` command `)

    }
