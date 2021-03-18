module.exports.config = {
    name: "calc",
    aliases: ['calculator'],
    description: "A working calculator",
    group: 'fun',
    usage: '.calc [first-Number] [function] [second-Number]'
    , example: ['.calc add 1 2 43 1 192', '.calc multiply 1 13 1', '.calc divide 1 3 12 ', '.calc minus']
}

module.exports.run = async (client, message, args) => {
    const firstNumber = Number(args[0]);
    const secondNumber = Number(args[2])

    if (!firstNumber || !secondNumber) return message.channel.send(client.main);

    const func = args[0];

    if (!func) return message.channel.send(client.main);

    const types = ['+', '-', '/', 'x', 'multiply', 'add', 'divide', 'minus'];

    if (!types.includes(func)) return message.channel.send(client.main);

    if (func === 'multiply' || func === 'x') {
        const answer = firstNumber * secondNumber
        return message.channel.send(`${firstNumber} ${func} ${secondNumber} = ${answer}`)
    }
    if (func === '+' || func === 'add') {
        const answer = firstNumber + secondNumber
        return message.channel.send(`${firstNumber} ${func} ${secondNumber} = ${answer}`)
    }
    if (func === '-' || func === 'multiply') {
        const answer = firstNumber - secondNumber
        return message.channel.send(`${firstNumber} ${func} ${secondNumber} = ${answer}`)
    }
    if (func === '/' || func === 'divide') {
        const answer = firstNumber / secondNumber
        return message.channel.send(`${firstNumber} ${func} ${secondNumber} = ${answer}`)
    }


}