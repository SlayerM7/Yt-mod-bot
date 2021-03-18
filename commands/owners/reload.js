const { MessageEmbed, Client, Message } = require("discord.js");

module.exports = {
    config: {
        name: "reload",
        description: "Reload a command to debug it",
        usage: '.reload [command]',
        group: "owners",
        ownerOnly: true,
        example: '.reload kick'
    },
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {*} args 
     * @returns 
     */
    run: async(client, message, args) => {
        const cmd = args[0];

        if (!cmd) return message.channel.send(client.main);

        if (!client.commands.has(cmd)) {
            return message.channel.send(
                new MessageEmbed()
                .setColor(client.failColor)
                .setDescription(`${client.fail} No such command as \`${cmd}\``)
            )
        }

        let placeHolder = client.commands.get(cmd);

            let msg = await message.channel.send(`Reloading \`${cmd}\`..`)

        client.commands.delete(cmd);

        setTimeout(() => {
            client.commands.set(cmd, placeHolder)
        }, 1000)

        msg.edit(`Reloaded \`${cmd}\` command in \`${msg.createdTimestamp - message.createdTimestamp}\`ms`)
    }
}