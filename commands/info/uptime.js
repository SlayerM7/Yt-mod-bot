const ms = require('ms')

module.exports.config = {
    name: "uptime",
    group: 'info',
    description: "get how long the bot has been online for",
}

module.exports.run = async(client, message, args) => {
        message.channel.send('Fetching uptime..').then((m) => {
            m.edit(`Uptime is: \`${ms(client.uptime)}\``)
        })
}