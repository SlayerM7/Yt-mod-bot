module.exports.config = {
    name: "afk",
    group: 'misc',
    description: 'Set your self as afk mode',
    usage: '.afk <reason>',
    cooldown: 5,
    example: '.afk Making food , Please don\'t ping'
}

module.exports.run = async(client, message, args) => {
    const reason = args.join(' ') ? args.join(' ') : "No reason given";

    client.afk.set(message.author.id, {
        reason: reason
    })

    message.reply('I have set you as AFK: ' + reason)
}