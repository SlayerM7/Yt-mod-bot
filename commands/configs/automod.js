const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "automod",
        description: "Enable/Disable auto moderation",
        usage: '.automod [function] <punishment>',
        example: '.automod ?on warn',
        permissions: ['MANAGE_GUILD'],
        group: 'config',
        botperms: ['EMBED_LINKS']
    },
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @returns 
     */
    run: (client, message, args) => {
        const func = args[0];
        if (!['?on', "?off"].includes(func)) {
            message.channel.send(client.main);
            return
        };


        if (func === '?off') {
            const file = require('../../database/automod.json');

            file[message.guild.id] = {
                func: false,
                settings: {
                    punishment: null
                }
            }

        const fs = require('fs')

        fs.writeFile('./database/automod.json', JSON.stringify(file, null, 2), (err) => {
            if (err) {}
        })
        const em = client.createEmbed('success', 'Auto mod is now **Disabled**', true, [null, null, null])

        message.channel.send(em)
        }
        if (func === '?on') {
            let punishment = args[1];

            if (!['warn', 'mute'].includes(punishment)) {
                message.channel.send(client.incorrectPunishmentAutoMod)
                return;
            };

            const file = require('../../database/automod.json');

            file[message.guild.id] = {
                func: true,
                settings: {
                    punishment: punishment
                }
            }

        const fs = require('fs')

        fs.writeFile('./database/automod.json', JSON.stringify(file, null, 2), (err) => {
            if (err) {}
        })


        message.channel.send(client.autoModEnabled)
        
            
        }

        
    }
}