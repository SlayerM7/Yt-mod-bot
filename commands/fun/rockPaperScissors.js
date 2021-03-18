module.exports.config = {
    name: "rps",
    description: "Rock paper scissors",
    aliases: ['rock-paper-scissors'],
    group: 'fun',
    example: '.rps rock',
    usage: '.rps [choice]'
}

module.exports.run = async (client, message, args) => {
    const botChoice = Math.floor(Math.random() * 3);

    let botEmoji;
    let playerEmoji;
    let botChoiceStr;

    if (!args[0]) {
        return message.channel.send(client.main);
    }

    if (!['rock', 'paper', 'scissors'].includes(args[0])) return message.channel.send(client.main)

    if (botChoice === 1) {
        botEmoji = ':newspaper: Paper'
        botChoiceStr = 'paper'
    }
    if (botChoice === 2) {
        botEmoji = ':rock: Rock'
        botChoiceStr = 'rock'
    }
    if (botChoice === 3) {
        botEmoji = ':scissors: Scissors '
        botChoiceStr = 'scissors'
    }

    if (args[0] == 'rock') {
        playerEmoji = ':rock: Rock'
    }
    if (args[0] == 'paper') {
        playerEmoji = ':newspaper: Paper'
    }
    if (args[0] == 'scissors') {
        playerEmoji = ':scissors: Scissors'
    }

    if (botChoiceStr === args[0]) return message.channel.send(`I picked: ${botEmoji}, You picked: ${playerEmoji}, We tied!`)
    
    if (args[0] === 'rock') {
        if (botChoiceStr === 'paper') return message.channel.send(`I picked: ${botEmoji}, You picked: ${playerEmoji}, You won!`)
        if (botChoiceStr === 'scissors') return message.channel.send(`I picked: ${botEmoji}, You picked: ${playerEmoji}, I won!`) 
    }
    if (args[0] === 'paper') {
        if (botChoiceStr === 'rock') return message.channel.send(`I picked: ${botEmoji}, You picked: ${playerEmoji}, You won!`)
        if (botChoiceStr === 'scissors') return message.channel.send(`I picked: ${botEmoji}, You picked: ${playerEmoji}, I won!`) 
    }
    if (args[0] === 'scissors') {
        if (botChoiceStr === 'paper') return message.channel.send(`I picked: ${botEmoji}, You picked: ${playerEmoji}, You won!`)
        if (botChoiceStr === 'rock') return message.channel.send(`I picked: ${botEmoji}, You picked: ${playerEmoji}, I won!`) 
    }
}