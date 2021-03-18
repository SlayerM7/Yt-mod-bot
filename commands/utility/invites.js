const { Client, Message } = require("discord.js")
const {MessageEmbed} = require('discord.js')


module.exports.config = {
    name: 'invites',
    group: 'utility',
    botperms: ['EMBED_LINKS'],
    description: "Get invites for a certain user",
    usage: '.invites',
    example: '.invites'
}

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {*} args 
 */

module.exports.run = async(client, message, args) => {

    let member = client.get(message, 'member', args, 0, true)


    if (!member) member = message.member
    
        let inviteCounter = {}
        
        message.guild.fetchInvites().then((invites) => {
            invites.forEach((invite) => {

                inviteCounter[invite.inviter.id] = (inviteCounter[invite.inviter.id] || 0) + invite.uses
            })

                const c = (inviteCounter[member.id] || 0);
            
                message.channel.send(client.createEmbed('main', `${member.user.username} has \`${c}\` invites`, true))

            })

}