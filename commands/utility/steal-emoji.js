const { Util, MessageEmbed } = require("discord.js");
const { parse } = require("superagent");

module.exports.config = {
    name: "steal-emojis",
    description: "Steal a emoji from any server",
    example: '.steal-emojis ✅',
    permissions: ['MANAGE_EMOJIS']
,    group: 'utility',
    cooldown: 10, 
    usage: '.steal-emojis [emojis]'
}

module.exports.run = async(client, message, args) => {
    if (!args.length) return message.channel.send(client.main);

    for (const rawEmoji of args) {
        const parsedEmoji = Util.parseEmoji(rawEmoji)

        if (parsedEmoji.id) {
            const extension = parsedEmoji.animated ? '.gif' : '.png'
            const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + extension}`

            message.guild.emojis.create(url, parsedEmoji.name).then((emoji) => {
                const embed = new MessageEmbed()
                .setColor(client.successColor)
                .setDescription(`${client.success} Added ${emoji.url}`)
                message.channel.send(embed)
            })
        }
    }
}