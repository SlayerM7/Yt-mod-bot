const { MessageEmbed } = require('discord.js');

module.exports.config = {
    name: "clearwarns",
    aliases: ['clearwarn'],
    usage: '.clearwarns [@user]',
    example: '.clearwarns @Slayer',
    group: 'moderation',
    description: "Clear all warnings of a user",
    permissions: ['ADMINISTRATOR']
}

module.exports.run = async(client, message, args) => {
    const member = message.mentions.members.last() ? message.mentions.members.last() : args[0];

    if (!member) return message.channel.send(client.main);

 
    let mm ;
    try {
    if (member === args[0]) mm = await message.guild.members.fetch(args[0]); else mm = await message.mentions.members.last();
    } catch {}
    if (!mm) return message.channel.send(client.noMember);

    if (mm.id === client.user.id) return message.channel.send(client.main);

    delete require('../../database/warns.json')[message.guild.id][mm.id];

    client.writeFile('warns.json', require('../../database/warns.json'))

    client.userlogs(mm.id, message.guild.id, 'cleared warnings', message)

    return message.channel.send(new MessageEmbed().setColor(client.successColor).setDescription(`${client.success} _Cleared all warnings for ${mm.user.username}_`))

}