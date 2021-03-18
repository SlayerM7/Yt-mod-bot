const { MessageEmbed } = require("discord.js")

module.exports.config = {
    name: "membercount",
    aliases: ['mc'],
    botperms: ['EMBED_LINKS'],
    group: 'misc',
    description: 'Shows server membercount',
    guildOnly: true
}

module.exports.run = async (client, message, args) => {
    const embed = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`**Members** \n ${message.guild.memberCount}`)
    .setTimestamp();

    message.channel.send(embed);
}