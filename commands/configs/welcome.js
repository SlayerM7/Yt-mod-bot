const { Client, Message, MessageEmbed } = require('discord.js');

module.exports.config = {
    name: 'welcome',
    description: 'Enable/Disable server welcomes',
    group: 'config',
    usage: '.welcome [function] [#channel]', 
    example: ['.welcome ?on #welcomes' , '.welcome check'],
    permissions: ['MANAGE_GUILD']
}
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    module.exports.run = async(client, message, args) => {
        const channel = message.mentions.channels.first() ? message.mentions.channels.first() : args[0];

        const fs = require('fs')

        if (!channel) return message.channel.send(client.main);

        let ch ;

        channel === args[0] ? ch  = message.guild.channels.cache.get(channel) : ch = message.guild.channels.cache.get(channel.id);


        const func = args[0];

        if (!func) return message.channel.send(client.main);

        if (!["?on", '?off', 'check'].includes(func)) return message.channel.send(client.main)
    
        if (func === 'check') {
            const ww = require('../../database/welcome.json')

            if (ww[message.guild.id]) {
                message.channel.send(
                    new MessageEmbed()
                    .setColor(client.color)
                    .setDescription(` the welcome channel being enabled is **${ww[message.guild.id].func}** and the welcome channel is <#${ww[message.guild.id].channel}>`)
                )
            } else {
                return message.channel.send(
                    new MessageEmbed()
                    .setColor(client.failColor)
                    .setDescription(`${client.fail} Couldn't find any data related to the server`)
                )
            }
        }

        const dataStore = class {
            constructor(func) {
                const ff = require('../../database/welcome.json');

                ff[message.guild.id] = {
                    func,
                    channel: ch.id
                }
                fs.writeFile('./database/welcome.json', JSON.stringify(ff, null, 2), (err) => {
                    if (err) {}
                })
            }
        }

        if (func === '?off') {
            new dataStore(false)
        
            return message.channel.send(
                new MessageEmbed()
                .setColor(client.successColor)
                .setDescription(`${client.success} Server welcome is now \`Disabled\``)
            )

        }

        if (func === '?on') {
            new dataStore(true) 

            return message.channel.send(
                new MessageEmbed()
                .setColor(client.successColor)
                .setDescription(`${client.success} Server welcome is now \`Enabled\``)
            )
        }

        
    }
