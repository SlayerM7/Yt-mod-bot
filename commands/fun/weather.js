const weather = require("weather-js");
const {MessageEmbed} = require('discord.js');

module.exports.config = {
    name: "weather",
    example: '.weather New york',
    aliases: ['loc'],
    group: 'fun',
    description: 'Search a specific place weather',
    cooldown: 5,
    usage: '.weather [location]'
}

module.exports.run = async(client, message, args) => {
    
    try {
    if (!args.join) return message.channel.send(client.main)

    weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) { 
        if (err) message.channel.send(err);

         if (result === undefined || result.length === 0) {
            const embed = new MessageEmbed()
            .setColor(client.failColor)
            .setDescription(`${client.fail} Couldn't find the location given`)
             message.channel.send({embed}); 

            return; 
        }

        var current = result[0].current; 
        var location = result[0].location; 

        const embed = new MessageEmbed ()
            .setDescription(`**${current.skytext}**`) 
            .setAuthor(`Weather for ${current.observationpoint}`) 
            .setThumbnail(current.imageUrl) 
            .setColor(0x00AE86) 
            .addField('Timezone',`UTC${location.timezone}`, true) 
            .addField('Degree Type',location.degreetype, true)
            .addField('Temperature',`${current.temperature} Degrees`, true)
            .addField('Feels Like', `${current.feelslike} Degrees`, true)
            .addField('Winds',current.winddisplay, true)
            .addField('Humidity', `${current.humidity}%`, true)

            message.channel.send({embed});
    })
} catch { 
    message.channel.send(`${client.fail} Failed to connect to API`)
}

}