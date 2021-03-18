module.exports.config = {
    name: "flip",
    group: 'fun',
    description: "Flip a coin",
    usage: '.flip [side]',
    example: ['.flip heads', '.flip tails']
}

module.exports.run = async(client, message, args) => {
    
    const input = args[0];

    if (!input) return message.channel.send(client.main);

    if (!['heads', 'tails'].includes(input)) return message.channel.send(client.main);

    const random = ['heads', 'tails'][Math.floor(Math.random() * ['heads', 'tails'].length)];
    
    if (random === input) {
        return message.reply(`${client.success} Landed **${random}**, You won!`)
    } else {
        return message.reply(`${client.fail} Landed **${random}**, I won!`)
    }

}