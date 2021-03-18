
const { Client, Message, MessageEmbed, MessageReaction } = require('discord.js');

const { v4 } = require('uuid')

const fs = require('fs')

const mainPrefix = require('../config/bot.json').prefix;

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

module.exports = async (client, message) => {

    if (require('../database/automod.json')[message.guild.id]) {

        let func = require('../database/automod.json')[message.guild.id].func;

        if (func === true) {

            let punishType = require('../database/automod.json')[message.guild.id].settings.punishment

            let warnPunish = () => {
                const file = require('../database/warns.json')


                if (!file[message.guild.id]) {
                    file[message.guild.id] = {}

                    fs.writeFile('./database/warns.json', JSON.stringify(file, null, 2), (err) => {
                        if (err) { }
                    })
                }

                if (!file[message.guild.id][message.member.id]) {
                    file[message.guild.id][message.member.id] = {}

                    fs.writeFile('./database/warns.json', JSON.stringify(file, null, 2), (err) => {
                        if (err) { }
                    })
                }


                file[message.guild.id][message.member.id][v4()] = {
                    reason: "Auto mod activated",
                    mod: "Auto mod",
                    date: new Date().toUTCString()
                }


                fs.writeFile('./database/warns.json', JSON.stringify(file, null, 2), (err) => {
                    if (err) { }
                })
            }

            let mutePunish = async () => {
                let muteRoleGuild = require('../database/muterole.json')[message.guild.id];

                if (muteRoleGuild) {
                    let muteRole = muteRoleGuild.role;

                    try {
                        await message.member.roles.add(muteRole);
                        setTimeout(async () => {
                            await message.member.roles.remove(muteRole);
                        }, 180 * 1000)
                    } catch (error) {
                        // console.log(error)
                    }
                }
            }

            // Bad word checker

            const badwords = ['nigger', 'pussy', 'fucker', 'fucking', 'nigga', 'fuck', 'bitch'];
    
            badwords.some((word) => {
                if (message.content.includes(word)) {
                    if (message.guild) {
                    if (!message.member.hasPermission("MANAGE_MESSAGES"))
                        if (message.member.manageable) {

                            message.delete().catch(() => { })
                                .then(() => {
                                   return message.reply('Watch your language!')
                                })
                            if (punishType === 'warn') {
                                warnPunish();
                            }

                            if (punishType === 'mute') {
                                mutePunish();
                            }
                        }
                }
            }
            })

            // Link checker

            const links = ['https://', 'discord.gg/']

            links.some((link) => {
                if (message.content.includes(link)) {
                    if (!message.member.hasPermission("MANAGE_MESSAGES"))
                        if (message.member.manageable) {

                            message.delete().catch(() => { })

                                .then(() => {
                                    message.reply('No links allowed')
                                })
                            if (punishType === 'warn') {
                                warnPunish();
                            }

                            if (punishType === 'mute') {
                                mutePunish();
                            }
                        }
                }
            })

        } else { }



    } else { };

    if (message.author.bot) return;

    if (message.mentions.users.first()) {

        if (client.afk.has(message.mentions.users.first().id)) {
            if (message.channel.type !== 'dm') {
                return message.reply(`${message.mentions.users.first().username} is AFK: ${client.afk.get(message.mentions.users.first().id).reason}`)
            }
        }
    }

    if (client.afk.has(message.author.id)) {
        client.afk.delete(message.author.id)
        return message.channel.send(`Welcome back ${message.author}, I have removed your AFK`)
    }

    let prePrefix;
    try {
        if (require('../database/prefixes.json')[message.guild.id]) {
            prePrefix = require('../database/prefixes.json')[message.guild.id].prefix;
        }
    } catch {
        prePrefix = mainPrefix;
    }

    const escapeRegex = require('../utils/structure/exports/escapeRegex').escapeRegex
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prePrefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;

    const [, prefix] = message.content.match(prefixRegex);


    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    const cmd = args.shift().toLocaleLowerCase();

    client.modlogsGo(client, message, `Message ID: ${message.id} | Author: ${message.author.id}`, `Used \`${cmd}\` command in <#${message.channel.id}> \n ${message.content}`)
}

module.exports.config = {
    type: 'message'
}