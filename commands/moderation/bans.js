const { Client, Message, MessageEmbed } = require("discord.js")

module.exports.config = {
    name: "bans",
    description: "Show all banned members",
    permissions: ['BAN_MEMBERS'],
    cooldown: 5,
    group: 'moderation'
}

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {String[]} args 
 */

module.exports.run = async(client, message, args) => {
    const fetchBans = message.guild.fetchBans();

    let bansSize = (await fetchBans).size;

    let bannedMembers =(await fetchBans).map((member) => `${member.user.tag} - ${member.user.id}`).join('\n')

    const embed = new MessageEmbed()
    .setColor(client.color)
    .setAuthor(`Found ${bansSize} members banned` ,message.guild.iconURL({dynamic: true}))
    .setDescription(bannedMembers)

    message.channel.send(embed)
}