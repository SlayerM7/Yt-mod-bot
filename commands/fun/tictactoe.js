module.exports.config = {
    name: "tictactoe",
    description: "play tictactoe",
    usage: '.tictactoe [@second_player]',
    group: 'fun',
    example: '.tictactoe @Vxntage'
}

module.exports.run = async(client, message, args) => {
    const { tictactoe } = require("reconlx");

    if (!message.mentions.users.last()) {
        return message.channel.send(client.main)
    }

    if (message.mentions.users.last().id === client.user.id) return message.channel.send(client.main)

    var game = new tictactoe({
        message: message,
        player_two: message.mentions.members.first(),
      });

}