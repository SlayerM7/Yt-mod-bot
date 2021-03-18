const { MessageEmbed } = require("discord.js");

module.exports.config = {
    name: "unload",
    description: "Unload a command so it will no longer work",
    usage: '.unload [command]',
    example: '.unload ban',
    group: "owners",
    ownerOnly: true,
}

module.exports.run = async(client, message, args) => {
    const cmd = args[0];

    if (!cmd) return message.channel.send(client.main)
 
    if (!client.commands.has(cmd)) {
        return message.channel.send(
            new MessageEmbed()
            .setColor(client.failColor)
            .setDescription(`${client.fail} No such command as \`${cmd}\``)
        )
    }


    const placeHolder = client.commands.get(cmd) 

    const aliases = client.commands.get(client.aliases.get(cmd))

    client.commands.delete(cmd)

   let m = await  message.reply(`\`${cmd}\` command has been unloaded`)

   m.edit(`\`${cmd}\` command has been unloaded in \`${m.createdTimestamp - message.createdTimestamp}\`ms`)


   client.unloads[cmd] = {
       dir: placeHolder,
   }

}