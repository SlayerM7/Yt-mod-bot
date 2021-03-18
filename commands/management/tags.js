const file = require('../../database/cmds.json')
const fs = require('fs');
const { confirmation } = require('reconlx')
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports.config = {
    name: 'tag',
    description: 'Create a custom respond tag ',
    group: 'management',
    permissions: ['MANAGE_GUILD'],
    usage: '.tag [set] [cmd] [response]',
    example: '.tag create name: socials response: Make sure to check our socials!',
    argsCount: 2,
}
/** 
 * @param {Client} client 
 * @param {Message} message 
 * @param {String[]} args 
 */
module.exports.run = async (client, message, args) => {
    if (!args[0]) return message.channel.send(client.main)
    if (args[0] === 'create') {

if (args.includes('name:') && args.includes('response:'))  {
    const index = args.indexOf('name:')
        const secondIndex = args.indexOf('response:')

        let nameValue = []
        let valueValue = []


        valueValue.push(...args) 
        nameValue.push(...args)

        valueValue.splice(index, 1)
        nameValue.splice(index, 1)

         for (const i in nameValue) {
            nameValue.splice(secondIndex, i)
        };

        var newArray = nameValue.filter(x => x !== 'response:')

    
        newArray.shift();

        var secondNewArray = valueValue.slice(newArray.length)


        secondNewArray.shift();

        secondNewArray.shift()


    
} else return message.channel.send(client.main)


        if (!args[0]) return message.channel.send(client.main);

        const cmd = newArray.join(' ').toLowerCase()

        if (!cmd) return message.channel.send(client.main);

        if (client.commands.has(cmd)) {
            return message.channel.send(
                client.createEmbed('fail', `There is a command with the name \`${cmd}\``, true)
            )
        }

        const msg = secondNewArray.join(' ');



        if (!msg) return message.channel.send(client.main);


        try {
            if (file[message.guild.id]) {
                if (file[message.guild.id][cmd]) {
                    message.reply(`There is already a tag called \`${cmd}\`, Would you like to edit it?`).then(async (m) => {
                        const emoji = await confirmation(m, message.author, ["✅", "❌"], 30000);

                        if (emoji === '✅') {
                            try {
                            var uses = (require('../../database/cmds.json')[message.guild.id][cmd].uses || 0)    
                            var createdBy = (file[message.guild.id][cmd].createdBy || message.author.tag)
                            var createdAt = (file[message.guild.id][cmd].createdAt || new Date().toUTCString())
                            } catch {
                                createdAt = new Date().toUTCString();
                                createdBy = message.author.tag
                                uses = 0;
                            }
                            file[message.guild.id][cmd] = {
                                msg,
                                date: new Date().toUTCString(),
                                lastEditedBy: message.author.tag,
                                createdBy,
                                createdAt,
                                uses
                            }
                            fs.writeFile('./database/cmds.json', JSON.stringify(file, null, 2), (err) => {
                                if (err) {};
                            })
                            message.channel.send(
                                new MessageEmbed()
                                    .setColor(client.successColor)
                                    .setDescription(`${client.success} set \`${cmd}\` as a tag with response as: **${msg}**`)
                            )
                            return;
                        } else if (emoji === '❌') {
                            m.delete();
                            return message.reply('Cancled')
                        }
                        return;
                    });
                    return
                };
            }
        } catch (e){
            console.log(e)
        }

        if (!file[message.guild.id]) {
            file[message.guild.id] = {}

            client.writeFile('cmds.json', file)

            setTimeout(() => {
                try {
                    var uses = (require('../../database/cmds.json')[message.guild.id][cmd].uses || 0)    
                    var createdBy = (file[message.guild.id][cmd].createdBy || message.author.tag)
                    var createdAt = (file[message.guild.id][cmd].createdAt || new Date().toUTCString())
                    } catch {
                        createdAt = new Date().toUTCString;
                        createdBy = message.author.tag
                        uses = 0;
                    }
                file[message.guild.id][cmd] = {
                    msg,
                    date: new Date().toUTCString(),
                    lastEditedBy: message.author.tag,
                    createdAt,
                    createdBy,
                    uses
                }
                client.writeFile('cmds.json', file);
                return message.channel.send(
                    new MessageEmbed()
                        .setColor(client.successColor)
                        .setDescription(`${client.success} set \`${cmd}\` as a tag with response as: **${msg}**`)
                )
            }, 2000)
            return
        }
        try {
            var uses = (require('../../database/cmds.json')[message.guild.id][cmd].uses || 0)    
            var createdBy = (file[message.guild.id][cmd].createdBy || message.author.tag)
            var createdAt = (file[message.guild.id][cmd].createdAt || new Date().toUTCString())
            } catch {
                createdAt = new Date().toUTCString;
                createdBy = message.author.tag
                uses = 0;
            }
        file[message.guild.id][cmd] = {
            msg,
            date: new Date().toUTCString(),
            lastEditedBy: message.author.tag,
            createdAt,
            createdBy
           ,uses 
        }
        client.writeFile('cmds.json', file);

        return message.channel.send(
            new MessageEmbed()
                .setColor(client.successColor)
                .setDescription(`${client.success} set \`${cmd}\` as a tag with response as: **${msg}**`)

        )

    }

    if (args[0] === 'info' || args[0] === 'information') {
        const tagGive = args[1]
        const noData = client.createEmbed('fail', 'No data for the serer', true)
        if (!tagGive) return message.channel.send(client.main);
        if (!require('../../database/cmds.json')[message.guild.id]) {
            return message.channel.send(noData)
        } else if (!require('../../database/cmds.json')[message.guild.id][tagGive]) return message.channel.send(client.createEmbed('fail', `No such tag as \`${tagGive}\``, true))
        const tag = require('../../database/cmds.json')[message.guild.id][tagGive]
        const em = '✅'
        const emID = '822076838369165363'


        const { timeout } = require("reconlx");

        const changeEmbed =  new MessageEmbed()
        .setColor(client.color)
        .addField("**Name:**" ,`\n\n${tagGive}`)
        .addField('Guild', message.guild.name)
        .addField('Last edited by', tag.lastEditedBy)
        .addField('Last modified at', tag.date)
        .addField('Total uses', tag.uses || 0)
        .addField('Created by', tag.createdBy)
        .addField('Created at', tag.createdAt)
        .setFooter('React to view tag response', message.author.displayAvatarURL({dynamic: true}))

       let mx = await message.channel.send(
          changeEmbed
        )
            mx.react(em).then((react) => {
                client.on('messageReactionAdd', (reaction, user) => {
                    if (user.id !== message.author.id) return;
                    if (reaction.message.id !== mx.id) return;
                   // if (reaction.emoji.id !== emID) return
                    mx.edit(`**Response:**\n\n${tag.msg}`, {embed: null});
                }) 
                client.on('messageReactionRemove', (reaction , user) => {
                    if (user.id !== message.author.id) {
                        return;
                    } 
                    if (reaction.message.id !== mx.id) return;
               //     if (reaction.emoji.id !== emID) return

                    mx.edit(null, {embed: changeEmbed});
                });
            });
        timeout(message, mx, 10 * 1000);
    };
 
    if (args[0] === 'check' || args[0] === 'list') {
        if (!file[message.guild.id]) {
            return message.channel.send(client.createEmbed('fail', 'No data found on the server', true, []));
        };

        message.channel.send(client.createEmbed('main', `**Tags:** \n ${Object.keys(file[message.guild.id]).join(', ')}`, true, [true, message.author.tag, message.author.displayAvatarURL({dynamic: true})]));
    };
 
    if (args[0] === 'remove' || args[0] === 'delete' || args[0] === 'del') {
        if (!args.slice(1).join(' ')) return message.channel.send(client.main);
        if (!require('../../database/cmds.json')[message.guild.id]) {
            return message.channel.send(client.createEmbed('fail', `No such tag as \`${args.slice(1).join(' ')}\``, true));
        } else if (!require('../../database/cmds.json')[message.guild.id][args.slice(1).join(' ')]) {
            return message.channel.send(client.createEmbed('fail', `No such tag as \`${args.slice(1).join(' ')}\``, true));
        };
        delete file[message.guild.id][args.slice(1).join(' ')];

        client.writeFile('cmds.json', file);

        return message.channel.send(
            new MessageEmbed()
            .setColor(client.successColor)
            .setDescription(`${client.success} Deleted \`${args.slice(1).join(' ')}\` tag`)
        );
    }; 
};