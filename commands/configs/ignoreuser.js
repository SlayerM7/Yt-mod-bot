const file = require('../../database/ignoreuser.json');
const { MessageEmbed } = require('discord.js');

module.exports.config = {
    name: 'ignoreuser',
    aliases: ['ignore-user', 'ignoremember', 'ignore-member'],
    permissions: ['MANAGE_GUILD'],
    botperms: ['EMBED_LINKS'],
    group: "config",
    description: 'Toggles command usage for a user',
    usage: '.ignoreuser [set] [@user]',
    example: ['.ignoreuser add @Slayer', '.ignoreuser delete @Slayer']
}

module.exports.run = async (client, message, args) => {

    const func = args[0];

    if (!func) return message.channel.send(client.main);

    if (!['check', 'add', 'delete', 'del'].includes(func)) return message.channel.send(client.main)

    if (func === 'add') {

        const user = message.mentions.members.last();

        if (!user) return message.channel.send(client.main);

        if (user.id === client.user.id) return message.channel.send(client.main);


        if (user.hasPermission("MANAGE_MESSAGES")) {
            return message.channel.send(client.userstaff)
        }

        file[message.guild.id] = {
            [`${user.id}`]: true
        }

        const fs = require('fs');

        fs.writeFile('./database/ignoreuser.json', JSON.stringify(file, null, 2), (err) => {
            if (err) { };
        });

        const doneIt = new MessageEmbed()
            .setColor(client.successColor)
            .setDescription(`${client.success} I am now ignoring commands from \`${user.user.username}\``)

        message.channel.send(doneIt)


    }

    if (func === 'delete' || func === 'del') {
        const user = message.mentions.users.last();

        if (!user) return message.channel.send(client.main);

        if (user.id === client.user.id) return message.channel.send(client.main);

        if (!file[message.guild.id]) {

            return message.channel.send(
                new MessageEmbed()
                    .setColor(client.failColor)
                    .setDescription(`${client.fail} There's no data for that user`)
            )
        } else {
            if (!file[message.guild.id][user.id]) {
                return message.channel.send(
                    new MessageEmbed()
                        .setColor(client.failColor)
                        .setDescription(`${client.fail} There's no data for that user`)
                )
                }
        }

        delete file[message.guild.id][user.id];

        client.writeFile('ignoreuser.json', file)

        return message.channel.send(
            new MessageEmbed()
            .setColor(client.successColor)
            .setDescription(`${client.success} Now listening for commands from ${user}`)
        )
    }
};