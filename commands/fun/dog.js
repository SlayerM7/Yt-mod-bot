const superagent = require('superagent')

module.exports = {
    config: {
        name: "dog",
        description: "Get a random dog",
        group: "fun",
        botperms: ['EMBED_LINKS']
    },
    run: async(client, message, args) => {
        let msg = await message.channel.send('Generating...')
        const{MessageEmbed}=require('discord.js')
        let { body } = await superagent
            .get('https://dog.ceo/api/breeds/image/random')
        //console.log(body.file)
        if (!{ body }) return message.channel.send('I cant! Please try again')
    
        const dogEmbed = new MessageEmbed()
    
            
            .setAuthor('dog!', message.guild.iconURL)
            .setColor(client.color)
            .setImage(body.message)
            .setTimestamp()
            
        msg.edit(null, {embed: dogEmbed})//.then(msg => msg.delete({timeout: '5000', reason: "Deleting dog picture "}));
    
    }
}