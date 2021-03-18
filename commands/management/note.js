const db = require('../../database/notes.json');
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports.config = {
    name: 'note',
    description: 'Manage notes for members',
    group: 'management',
    usage: '.note [set] [@member]', 
    example: ['.note add @Slayer Is a good coder', '.note check @Slayer', '.note remove @Slayer', '.notem update @slayer is acc the best coder no cap'],
    permissions: ['ADMINISTRATOR']
}
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    module.exports.run = async(client, message, args) => {
        const func = args[0];

        if (!func) return message.channel.send(client.main);

        if (!['add', 'check', 'remove', 'update'].includes(func)) return message.channel.send(client.main);

        let saveData = class {
            constructor( user, note) {
                if (!db[message.guild.id]) {
                    db[message.guild.id] = {}
                       client.writeFile('notes.json', db)
            
                    }
                    setTimeout(() => {
                        db[message.guild.id][user] = {
                            note
                        }

                        client.writeFile('notes.json', db)
                    }, 2000)
        }
        }

        if (func === 'add') {
            const user = message.mentions.users.last();

            if (!user) return message.channel.send(client.main);

            if (user.id === client.user.id) return message.channel.send(client.main)

            const note = args.slice(2).join(' ');

            if (!note) return message.channel.send(client.main)

            if (db[message.guild.id]) {
                if (db[message.guild.id][user.id]) {
                    return message.channel.send(
                        new MessageEmbed()
                        .setColor(client.failColor)
                        .setDescription(`${client.fail} The user already has a note`)
                    )
                }
            }

            new saveData(user.id, note)

            return message.channel.send(
                new MessageEmbed()
                .setColor(client.successColor)
                .setDescription(`${client.success} Added note for ${user}`)
            );
         }

         if (func === 'check') {
             const user = message.mentions.users.last();

             if (!user) return message.channel.send(client.main);

             if (![db[message.guild.id]]) {
                 return message.channel.send(
                     new MessageEmbed()
                     .setColor(client.failColor)
                     .setDescription(`${client.fail} There's no notes for this server`)
                 )
             } else if (!db[message.guild.id][user.id]) {
                return message.channel.send(
                    new MessageEmbed()
                    .setColor(client.failColor)
                    .setDescription(`${client.fail} There's no note for that user`)
                )
             }

             return message.channel.send(
                 new MessageEmbed()
                 .setColor(client.successColor)
                 .setDescription(`${client.success} Note for \`${user.username}\`: _${db[message.guild.id][user.id].note}_`)
             )
         };

         if (func === 'remove') {
             const user = message.mentions.users.last();

             if (!user) return message.channel.send(client.main);

             if (user.id === client.user.id) return message.channel.send(client.main);

             delete db[message.guild.id][user.id];

             client.writeFile('notes.json', db)

             return message.channel.send(
                 new MessageEmbed()
                 .setColor(client.successColor)
                 .setDescription(`${client.success} Deleted note for ${user.username}`)
             )
         };

         if (func === 'update') {
            const user = message.mentions.users.last();

            if (!user) return message.channel.send(client.main);

            if (user.id === client.user.id) return message.channel.send(client.main)

            const note = args.slice(2).join(' ');

            if (!note) return message.channel.send(client.main)


            new saveData(user.id, note)

            return message.channel.send(
                new MessageEmbed()
                .setColor(client.successColor)
                .setDescription(`${client.success} Updated note for ${user}`)
            );
         }

    }
