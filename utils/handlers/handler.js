const { prefix: mainPrefix, owners, test_server: testChannelID } = require('../../config/bot.json')
const { MessageEmbed, Client, Message } = require('discord.js');
const cooldown = {};

const cc = new Map();

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

module.exports = async (client, message) => {
    if (message.channel.type === 'dm') return;
    //if (message.channel.type !== 'dm') {
    var prePrefix;
    if (require('../../database/prefixes.json')[message.guild.id]) {
        prePrefix = await require('../../database/prefixes.json')[message.guild.id].prefix;


    } else {
        prePrefix = mainPrefix
    }
    var escapeRegex = require('../structure/exports/escapeRegex').escapeRegex

    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prePrefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;

    const [, prefix] = message.content.match(prefixRegex);
    if (!message.content.startsWith(prefix)) return;
    if (message.author.bot) return;
    let args = message.content.slice(prefix.length).trim().split(/ +/g);

    const cmm = args.shift().toLocaleLowerCase();

    var command = client.commands.get(cmm) || client.commands.get(client.aliases.get(cmm)) //client.commands.get(cmm) || client.commands.get(client.aliases.get(cmm))

    if (!command) return;

    if (command.config.guildOnly) {
        if (command.config.guildOnly === true) {
            if (message.channel.type === 'dm') {
                return message.channel.send(client.guildOnlyCmd);
            }
        }
    };

    if (command.config.permissions) {
        let neededPerms = [];

        command.config.permissions.forEach((p) => {
            if (!message.member.hasPermission(p)) neededPerms.push('`' + p + '`');
        });



        try {

            let perm = require('../../database/perms.json')[command.config.name][message.guild.id];

            if (perm !== 'NONE') {

                if (message.member.hasPermission(perm)) {
                    neededPerms = []
                } else {
                    console.log('Reseting')
                    neededPerms = [];

                    neededPerms.push(`\`${perm}\``)
                };
            };
        } catch (e) { }

        if (neededPerms.length) {
            if (!owners.includes(message.author.id)) {
                const noPEmbe = new MessageEmbed()
                    .setColor(client.color)
                    .setDescription(`You need ${neededPerms.join(', ')} permissions to use this command`)
                try {
                    return await message.channel.send(noPEmbe);
                } catch {

                    try {

                        return await message.channel.send(`I am missing the \`EMBED_LINKS\` permission`);

                    } catch {

                        const cantSend = await new MessageEmbed()
                            .setColor(client.color)
                            .setAuthor(message.author.tag, message.author.displayAvatarURL())
                            .setDescription('I am missing permissions to send messages in **' + message.guild.name + '**')
                            .setFooter(message.guild.name, message.guild.iconURL())

                        return message.member.send(cantSend)

                    }
                }
            }
        }
    };

    if (command.config.ownerOnly) {
        if (command.config.ownerOnly === true) {
            if (!owners.includes(message.author.id)) return message.reply(`That command is a owner only command`)
        }
    };

    if (command.config.nsfw) {
        if (command.config.nsfw === true) {
            if (!message.channel.nsfw) {
                return message.channel.send(client.nsfwChannel);
            };
        };
    };

    if (command.config.botperms) {
        let neededPerms = [];

        command.config.botperms.forEach((p) => {
            if (!message.guild.me.hasPermission(p)) neededPerms.push('`' + p + '`');
        });


        if (neededPerms.length) {

            const noPEmbe = await new MessageEmbed()
                .setColor(client.color)
                .setDescription(`I am missing ${neededPerms.join(', ')} permission(s)`)
            return await message.channel.send(noPEmbe);
        }


    };
    if (command.config.testOnly) {
        if (command.config.testOnly === true) {
            if (message.channel.id !== testChannelID) {
                message.member.send('This command can only be used in the bot testing server')
                return;
            }
        }
    };
    if (command.config.serverOwnerOnly) {
        if (command.config.serverOwnerOnly === true){
            if (message.author.id !== message.guild.ownerID) return message.channel.send(client.createEmbed('fail', 'Only the server owner can use this command', true))
        }
    }

    let cmdExample

    if (command.config.example) {
        if (typeof command.config.example === 'string') {
            cmdExample = command.config.example
        } else {
            cmdExample = command.config.example.join('\n')
        }
     }

    client.main = new MessageEmbed()
        .setColor(client.color)
        .setTitle(`Command: ${command.config.name}`)
        .setDescription(`**Description:** ${command.config.description} \n**Cooldown:** ${command.config.cooldown || 3} second(s) ${command.config.aliases ? '\n' : ''}${command.config.aliases ? `**Aliases:** ${command.config.aliases.join(', ')}` : ''} \n  **Usage:** ${command.config.usage} \n **Example:** ${cmdExample || "None"}`)

    let commandFile = client.commands.get(cmm) || client.commands.get(client.aliases.get(cmm))
    if (commandFile) {
        //   if (client.cooldown.has(message.author.id)) return message.reply('A little to quick there');

        try {
            if (await require('../../database/enables.json')[commandFile.config.name][message.guild.id] === true) {
                return message.reply(client.disabled);
            }
        } catch {

        }
        if (!message.guild.me.hasPermission('USE_EXTERNAL_EMOJIS')) return message.reply('I cannot do anything without \`USE_EXTERNAL_EMOJIS\` permissions');
        if (require('../../database/ignoreuser.json')[message.guild.id]) {
            if (require('../../database/ignoreuser.json')[message.guild.id][message.author.id] === true) {
                return message.channel.send(client.ignoringUser);
            }
        }
        /**
         *   const time = (command.config.cooldown || 3);
          let counting = time;
  
          let counterSpam = setInterval(() => {
              if (counting <= 0) {
                  clearInterval(counterSpam)
                  return;
              }
              counting--
              console.log(counting)
          
          }, 1000)
         */

        const time = (command.config.cooldown || 3)

        try {

            if (cooldown[command.config.name][`${message.author.id}`]) {
                return message.reply(`Wait ${time} seconds before using this command again`);
            }
        } catch { };

        if (require('../../database/blacklisted.json')[message.author.id]) {
            return message.reply(client.createEmbed('fail', `You have been blacklisted by ${require('../../database/blacklisted.json')[message.author.id].author} , You cannt access any commands`, false))
        }

        commandFile.run(client, message, args/*message.content.slice(prePrefix.length).trim().split(/ +/g).shift()*/);

        if (!cooldown[command.config.name]) {
            cooldown[command.config.name] = {}

        }

        if (!owners.includes(message.author.id)) {

            cooldown[command.config.name][message.author.id] = {
                time: time
            }
            let spamChecker = setInterval(() => {
                try {
                    var oldTime = cooldown[command.config.name][message.author.id].time;


                    if (!cooldown[command.config.name][message.author.id].time <= 0) {

                        cooldown[command.config.name][message.author.id] = {
                            time: oldTime - 1
                        }
                    }
                } catch { }
            }, 1000)
            //       console.log(cooldown)

            setTimeout(() => {
                delete cooldown[command.config.name][message.author.id]
            }, time * 1000);
        };

    };
}