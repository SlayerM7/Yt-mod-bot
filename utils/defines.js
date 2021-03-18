const { Collection, MessageEmbed } = require("discord.js")

module.exports = {
    run: async(client) => {
    client.color = require('../config/colors.json').main;
    client.commands = new Collection();
    client.aliases = new Collection();
    client.cooldown = new Set();
    client.afk = new Map();
    client.channelMsgs = new Map();
    client.snipes = new Map();
    client.failColor = require('../config/colors.json').fail
    client.successColor = require('../config/colors.json').success
    client.prefix;
    client.success = require('../config/emojis.json').success
    client.fail = require('../config/emojis.json').fail
    try {
        await client.on('message', async (message) => {
            if (message.channel.type === 'dm') return
            if (require('../database/prefixes.json')[message.guild.id]) {
                client.prefix = await require('../database/prefixes.json')[message.guild.id].prefix;
            } else {
                client.prefix = await require('../config/bot.json').prefix;
            }
        })
    } catch {

    };

    client.groups = ['moderation', 'info',  'misc', 'utility', 'fun', 'config', 'management', 'owners']

    client.mutes = new Set();
    client.muteRisks = new Set();
    client.mainURL = require('../config/settings.json').mainURL;
    client.botName = require('../config/settings.json').bot_name
    client.config = require('../config/bot.json');
    client.unloads = {};
},

}