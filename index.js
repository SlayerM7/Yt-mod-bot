const { Client } = require('discord.js');
const client = new Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

const { token } = require('./config/bot.json');

require('./utils/defines').run(client)
require('./utils/structure/registery').run(client);
require('./utils/handlers/commands')(client);
require('./utils/handlers/events')(client);

client.on('message', (message) => {
    require('./utils/handlers/tags')(client, message)
    require('./utils/handlers/handler')(client, message);
    });

client.on('messageUpdate', (o, message) => {
    require('./utils/handlers/tags')(client, message)
    require('./utils/handlers/handler')(client, message)
});

client.login(token).catch(() => {
    console.log('Incorrect token given!! Please make sure to go to the config folder and check all files and fill them out');
});