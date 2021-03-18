module.exports.config = {
    name: "hangman",
    group: 'fun',
    description: "Play hangman",
    usage: '.handman [#channel] [word]',
    example: '.hangman #games banna'
}

module.exports.run = async(client, message, args) => {
    const {hangman} = require('reconlx')

    const channel = message.mentions.channels.first();

    if (!channel) return message.channel.send(client.main)

    if (!args.slice(1).join(' ')) return message.channel.send(client.main)


    // making hangman
const hang = new hangman({
    message: message,
    word: args.slice(1).join(" "),
    client: client,
    channelID: message.mentions.channels.first().id,
  });
  
  // starting the game
  hang.start();
}