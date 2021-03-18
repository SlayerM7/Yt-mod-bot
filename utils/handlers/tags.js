module.exports = async(client, message) => {
    if (require('../../database/cmds.json')[message.guild.id]) {

        let prefix
        if (require('../../database/prefixes.json')[message.guild.id]) {
            prefix = await require('../../database/prefixes.json')[message.guild.id].prefix;
        } else {
            prefix = await require('../../config/bot.json').prefix;
        }
        const args = message.content.slice(prefix.length).trim().split(/ +/g)
        const cmd = args.join(' ')

        if (require('../../database/cmds.json')[message.guild.id][cmd]) {
            const f = require('../../database/cmds.json')

            f[message.guild.id][cmd] = {
                msg: f[message.guild.id][cmd].msg,
                date: f[message.guild.id][cmd].date,
                lastEditedBy: f[message.guild.id][cmd].lastEditedBy,
                uses: (f[message.guild.id][cmd].uses || 0 ) + 1
               , createdAt: (f[message.guild.id][cmd].createdAt || new Date().toUTCString()),
               createdBy: (f[message.guild.id][cmd].createdBy)
            }

            client.writeFile('cmds.json', f)

            return message.channel.send(require('../../database/cmds.json')[message.guild.id][cmd].msg);
        };
    };
};