const { Client, GuildMember, Message, MessageAttachment, GuildMemberManager } = require('discord.js');
/**
 * 
 * @param {Client} client 
 * @param {GuildMember} member 
 */

module.exports = async (client, member) => {

    if (require('../database/autorole.json')[member.guild.id]) {
        const ff = require('../database/autorole.json')[member.guild.id];

        if (ff.func === true) {
            ff.role.forEach(async(f) => {
            
                if (member.guild.roles.cache.has(f)) {
                    try {
                        member.roles.add(f, 'Auto role enabled')
                    } catch (error) { }
            }
        })
        } 
    }

    const welcome = require('../database/welcome.json')

    if (welcome[member.guild.id]) {
        if (welcome[member.guild.id].func === true) {
            const channel = welcome[member.guild.id].channel;

            if (member.guild.channels.cache.has(channel)) {
                let ch = await member.guild.channels.cache.get(channel)

                const canvas = require('discord-canvas')

                const welcomeEmbed = new canvas.Welcome()
                .setUsername(member.user.username)
                .setDiscriminator(member.user.discriminator)
                .setMemberCount(member.guild.memberCount)
                .setGuildName(member.guild.name)
                .setAvatar(member.user.displayAvatarURL({format: 'png'}))
       
                  .setColor('border', '#28FF1C')
                .setColor('username-box', '#28FF1C')
                .setColor('discrinator-box', '#28FF1C')
                .setColor('message-box', '#28FF1C')
                .setColor('title', '#28FF1C')
                .setColor('avatar', '#28FF1C')
               // .setBackground('https://unsplash.com/photos/dtmz4CDRXqw')
                //  .setBackground("https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Ffc00.deviant")//.toAttachment()
        
                
                const image = new MessageAttachment(
                    (await welcomeEmbed.toAttachment()).toBuffer()
                )

                ch.send(member, image);
            }
        }
    }

    if (client.muteRisks.has(member.id)) {
        try {
                let muteRole = await require('../database/muterole.json')[member.guild.id].role;

                member.roles.add(muteRole, 'Memebr tried to leave and rejoin to bypass a mute');
        } catch (error) {
            
        }
    }

    if (require('../database/antibot.json')[member.guild.id]) {
        if (require('../database/antibot.json')[member.guild.id].func === true) {
            let { user_punish, bot_punish } = require('../database/antibot.json')[member.guild.id].settings

            if (member.user.bot) {
                let userAddedID = await member.guild.fetchAuditLogs({type:"BOT_ADD"}).then((x => x.entries.first().executor.id));
                let u = await member.guild.members.fetch(userAddedID);
                console.log(userAddedID)

                if (member.manageable) {
                    if (bot_punish === 'kick') {
                        member.kick('Anti bot is enabled').catch(() => {

                        });
                    }
                    if (bot_punish === 'ban') {
                        member.ban({ reason: 'Anti bot is enabled' }).catch(() => {

                        })
                    }
                }
                if (u.manageable) {
                if (user_punish === 'remove_roles') {
                    u.roles.set([]).catch(() => {

                    })
                };
                if (user_punish === 'kick') {
                    u.kick('Added a bot to the server').catch(() => {

                    })
                }
                if (user_punish === 'ban') {
                    u.ban({ reason: "Added a bot to the server" }).catch(() => {

                    })
                }
            }
            }

        } else { }
    }
}
module.exports.config = {
    type: 'guildMemberAdd'
}