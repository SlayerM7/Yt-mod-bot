const { MessageEmbed, Message, Client } = require("discord.js")

const { v4 } = require('uuid')

const fs = require('fs')


module.exports = {
    /**
     * 
     * @param {Client} client 
     */
    run: (client) => {

        // Toggling command system

        client.alreadyEnabled = new MessageEmbed()
            .setColor(client.failColor)
            .setDescription(`${client.fail} That command is already enabled`)

        client.alreadyDisabled = new MessageEmbed()
            .setColor(client.failColor)
            .setDescription(`${client.fail} That command is already disabled`)

        client.guarded = new MessageEmbed()
            .setColor(client.failColor)
            .setDescription(`${client.fail} You cannot enable/disable that command`);
        // Unkwon command

        client.aintCommandSherlock = new MessageEmbed()
            .setColor(client.failColor)
            .setDescription(`${client.fail} Unknown command`)

        // Auto mod

        client.autoModEnabled = new MessageEmbed()
            .setColor(client.successColor)
            .setDescription(`${client.success} Automod is now **Enabled**`)

        // Incorrect member given

        client.noMember = new MessageEmbed()
            .setColor(client.failColor)
            .setDescription(`${client.fail} Unknown member`)

        // Incorrect user given

        client.noUser = new MessageEmbed()
            .setColor(client.failColor)
            .setDescription(`${client.fail} Unknown user`)

        // Role checking 

        client.roleHigher = new MessageEmbed()
            .setColor(client.failColor)
            .setDescription(`${client.fail} That user is a higher role than me`)

        // Snipe command

        client.noSnipes = new MessageEmbed()
            .setColor(client.failColor)
            .setDescription(`${client.fail} There\'s no messages to snipe`)

        // Ban and kick command

        client.higherRole = new MessageEmbed()
            .setColor(client.failColor)
            .setDescription(`${client.fail} That member is a higher role than you`);

        // Anti bot 

        client.incorrectOP = new MessageEmbed()
            .setColor(client.failColor)
            .setDescription(`${client.fail} There are Only \`ban, kick\` bot punishments `)

        client.incorrectUserPunish = new MessageEmbed()
            .setColor(client.failColor)
            .setDescription(`${client.fail} There are only \`ban, kick, remove_roles\` user punishments`)

        // Over all moderation section

        client.noUserDB = new MessageEmbed()
            .setColor(client.failColor)
            .setDescription(`${client.fail} User not found in database`)

        client.userstaff = new MessageEmbed()
            .setColor(client.failColor)
            .setDescription(`${client.fail} That member is a mod/admin! I can\'t do that`)

        client.userNoWarns = new MessageEmbed()
            .setColor(client.failColor)
            .setDescription(`${client.fail} _The user has no warnings_`)


        client.cantDelOwnWarn = new MessageEmbed()
            .setColor(client.failColor)
            .setDescription(`${client.fail} _You cannot delete your own warning_`)


        client.amountNum = new MessageEmbed()
            .setColor(client.failColor)
            .setDescription(`${client.fail} Amount must be a number`)

        // Guild checks

        client.guildOnlyCmd = new MessageEmbed()
            .setColor(client.failColor)
            .setDescription(`${client.fail} This is a guild only command`)

        // Mute role checks

        client.noMuteRole = new MessageEmbed()
            .setColor(client.failColor)
            .setDescription(`${client.fail} Failed to find mute role`);

        client.muteRoleInvalid = new MessageEmbed()
            .setColor(client.failColor)
            .setDescription(`${client.fail} Mute role found in database but not server`)

        client.roleHigherThanMe = new MessageEmbed()
            .setColor(client.failColor)
            .setDescription(`${client.fail} The mute role is a higher role than me`);

        // Channel checking 

        client.noChannel = new MessageEmbed()
            .setColor(client.failColor)
            .setDescription(`${client.fail} Unknown Channel `)



        // NSFW checks 

        client.nsfwChannel = new MessageEmbed()
            .setColor(client.color)
            .setDescription('Use NSFW commands in a NSFW marked channel (look in channel settings)   ')
            .setImage('https://i.imgur.com/oe4iK5i.gif')

        // Mute checking

        client.isMuted = new MessageEmbed()
            .setColor(client.failColor)
            .setDescription(`${client.fail} The member is already muted`)

        // Simple checking

        client.disabled = new MessageEmbed()
            .setColor(client.failColor)
            .setDescription(`${client.fail} That command is disabled`)

        client.noperms = new MessageEmbed()
            .setColor(client.failColor)
            .setDescription(`${client.fail}Member missing required permissions`)

        // automod cmd

        client.incorrectPunishmentAutoMod = new MessageEmbed()
            .setColor(client.failColor)
            .setDescription(`${client.fail} Incorrect punishment \n \n Valid Punishments: \n warn \n mute `)

        // Setup command 

        client.setupStart = new MessageEmbed()
            .setColor(client.color)
            .setDescription(`_Starting setup_`)

        client.setlogsChannel = new MessageEmbed()
            .setColor(client.successColor)
            .setDescription(`${client.success} All modlogs have been set to this channel`)

        client.completeSetup = new MessageEmbed()
            .setColor(client.successColor)
            .setDescription(`${client.success} _Completed setup!_`)


        // Ignoring

        client.ignoringUser = new MessageEmbed()
            .setColor(client.failColor)
            .setDescription(`${client.fail} You are a ignored user in this server`)



        // fs.writeFile function 

        client.writeFile = (path, file) => {
            fs.writeFile(`./database/${path}`, JSON.stringify(file, null, 2), (err) => {
                if (err) {

                }
            })
        }

        // User logging

        client.userlogs = (userID, guildID, type, msg) => {

            const userLogs = require('../../database/userlogs.json')

            if (!userLogs[userID]) {
                userLogs[userID] = {}
                client.writeFile('userlogs.json', userLogs)
            }

            if (!userLogs[userID][guildID]) {
                userLogs[userID][guildID] = {}
                client.writeFile('userlogs.json', userLogs)
            }

            userLogs[userID][guildID][v4()] = {
                type: type,
                mod: msg.author.tag,
                date: new Date().toUTCString()
            }

            client.writeFile('userlogs.json', userLogs)
        };


        // Multiple gets 

        client.get = (message, type, args, argsCount, ...bool) => {

            let output

            if (type === 'channel') {
                const ch = message.mentions.channels.first() ? message.mentions.channels.first() : args[argsCount];

                //      if (!ch) return message.channel.send(client.main)

                const channel = ch === args[argsCount] ? message.guild.channels.cache.get(ch) : message.guild.channels.cache.get(ch.id);

                output = channel
            } else if (type === 'role') {
                const rl = message.mentions.roles.first() ? message.mentions.roles.first() : args[argsCount];


                const role = ch === args[argsCount] ? message.guild.roles.cache.get(rl) : message.guild.roles.cache.get(rl.id);

                output = role
            } else if (type === 'member') {
                var mm = message.mentions.members.last() ? message.mentions.members.last() : args[argsCount];


                if (bool === true) {
                    if (!mm) {
                        mm = message.member
                    }
                }

                try {
                    if (mm.id === client.user.id) return message.channel.send(client.main)
                } catch { }
                const member = mm === args[argsCount] ? message.guild.members.cache.get(mm) : message.guild.members.cache.get(mm.id);

                output = member

            } ;

            return output

        }


        // Embed function


        client.createEmbed = (type = String, description = String, bool = Boolean, ...rest) => {

            if (rest) {
                var [doAuthor = false, username, url] = rest
            }

            let emoji = type === 'success' ? client.success : type === 'fail' ? client.fail : type === 'main' ? '' : '';

            let us

            if (bool === true) {
                us = '_'
            }
            else {
                us = ''
            }


            const embed = new MessageEmbed()
                .setColor(type === 'success' ? client.successColor : type === 'fail' ? client.failColor : type === 'main' ? client.color : client.color)
                .setDescription(emoji + ' ' + us + description + us)
            if (rest) {
                if (doAuthor === true) {
                    embed.setAuthor(username, url)
                }
            }

            return embed
        }

        // Modlogs function 

        client.modlogsGo = async (client, message, footer, description) => {
            var prePrefix;
            if (require('../../database/prefixes.json')[message.guild.id]) {
                prePrefix = await require('../../database/prefixes.json')[message.guild.id].prefix;

            } else {
                prePrefix = mainPrefix
            }
            const escapeRegex = require('../structure/exports/escapeRegex').escapeRegex
            const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prePrefix)})\\s*`);
            if (!prefixRegex.test(message.content)) return;

            const [, prefix] = message.content.match(prefixRegex);


            const args = message.content.slice(prefix.length).trim().split(/ +/g);

            if (!require('../../database/modlogs.json')[message.guild.id]) return;
            let modLogsID = require('../../database/modlogs.json')[message.guild.id].channel;


            const cmd = args[0]

            let commandFile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))

            if (commandFile) {
                try {
                    const modLogsEmbed = new MessageEmbed()
                        .setColor(client.color)
                        .setAuthor(message.author.tag, message.author.displayAvatarURL())
                        .setDescription(description)
                        .setFooter(footer)
                        .setTimestamp()



                    await message.guild.channels.cache.get(modLogsID).send(modLogsEmbed);
                } catch {

                }
            }
        }

    }
}
