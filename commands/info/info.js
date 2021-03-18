const { MessageEmbed, Client, Message } = require('discord.js')

module.exports.config = {
    name: "information",
    group: 'info',
    description: 'get information about the bot',
}

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {*} args 
 */

module.exports.run = async(client, message, args) => {

    let totalMembers = 0;

    for (const guild of client.guilds.cache) {
        totalMembers += (await guild[1].members.fetch()).size;
    }

    const infoEmbed = new MessageEmbed()
    .setColor(client.color)
    //.setURL("https://discord.com/api/oauth2/authorize?client_id=782204406917365790&permissions=8&scope=bot")
    .setTitle(`**${client.botName}**`)
    .setDescription(`More info about [${client.user.username}](hhttps://discord.com/api/oauth2/authorize?client_id=815259518690131989&permissions=8&scope=bot)`)
    .addField("🔹__Version__", "1.0.7", true)
    .addField('📚__Libary__', "**Discord.JS**    ", true)
    .addField('__Creators__', " Slayer", true)
    .addField('  __Servers & Users__', `Total Servers: \`${client.guilds.cache.size}\` \n Total Users: \`${totalMembers}\``, true)
    .addField("❓__Prefixes__", ` Default :\`${require('../../config/bot.json').prefix}\` \n Server prefix: \`${client.prefix}\``, true)
    .addField("💠 __Shards__", `Online: \`${client.options.shardCount}\` \n Total: \`${client.options.shardCount}\``, true)
    .setThumbnail(client.mainURL)
    .setTimestamp()
    .setFooter('Uptime: 24/7');
   

    message.channel.send(infoEmbed);

}