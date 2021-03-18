const { MessageEmbed } = require('discord.js');

module.exports.config = {
    name: "docs",
    aliases: ['search'],
    usage: '.docs [query]',
    example: '.docs Embed',
    group: 'misc'
    , description: 'Search the discord.js documentation'
}

module.exports.run = async(client, message, args) =>{
    const axios = require('axios')
    if (!args.length) return message.channel.send(client.main);
    const uri = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(args.join(' '))}`;
    axios.get(uri)
    .then(async(embed) => {
        const { data } = embed
        
        if (data && !data.error) {
            const { timeout } = require("reconlx");
            
            const messageToDelete = await message.channel.send({embed: data})

            timeout(message, messageToDelete, 5000);
        } else {
            message.reply(new MessageEmbed().setColor(client.failColor).setDescription(`${client.fail} Couldn't find that query`)); 
        }
    })
    .catch(err => {
        console.log(err)
    }) 
}
