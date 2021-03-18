const { Client, Guild, MessageEmbed } = require("discord.js")

/**
 * 
 * @param {Client} client 
 * @param {Guild} guild 
 */


module.exports = (client, guild) => {
   let ch =  guild.channels.cache.random()

   const joinEmbed = new MessageEmbed()
   .setColor(client.color)
   .setDescription(`_Thank you for adding **${client.user.username}**_ \n \n *To get started type \`${require('..//config/bot.json').prefix}help\` or set your own custom prefix with \`${require('../config/bot.json').prefix}prefix\`*`)
   .addField('Important links', `[invite link](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot) `)
   .setFooter(guild.name, guild.iconURL({dynamic: true}))

   ch.send(joinEmbed);

}

module.exports.config = {
    type: 'guildCreate'
}