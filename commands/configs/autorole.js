const { Client, Message, MessageEmbed, CategoryChannel } = require('discord.js');

module.exports.config = {
    name: 'autorole',
    description: 'Control all autoroles',
    group: 'config',
    usage: '.autorole [set]',
    example: ['.autorole add @community', '.autorole remove @community', '.autorole check'],
    permissions: ['MANAGE_GUILD']
}
/** 
 * @param {Client} client 
 * @param {Message} message 
 * @param {String[]} args 
 */
module.exports.run = async (client, message, args) => {

    const func = args[0]

    if (!func) return message.channel.send(client.main)

    if (!['add', 'check', 'remove', 'disable', 'clear'].includes(func)) return message.channel.send(client.main)

    if (func === 'clear') {
        const db = require('../../database/autorole.json')

        if (!db[message.guild.id]) return message.channel.send(client.createEmbed('fail', 'There\'s no autorole data for this server', true,[]))

        const size = db[message.guild.id].role.length

        db[message.guild.id] = {
            func: true,
            role: []
        }

        client.writeFile('autorole.json', db)
    
        message.channel.send(client.createEmbed('success', `Cleared \`${size}\` autoroles`, true, []))

    }

    if (func === 'add') {
        const r = message.mentions.roles.first() ? message.mentions.roles.first() : args[1]

        if (!r) return message.channel.send(cliet.main)

        if (r === args[1]) {
            if (args[1].includes('<@')) {
                return message.channel.send(client.main)
            }

         }

        let role;

        r === args[0] ? role = await message.guild.roles.fetch(r) : role = await message.guild.roles.fetch(r.id);

        const file = require('../../database/autorole.json');

        if (file[message.guild.id]) {

            if (file[message.guild.id].role) {
                const roles = file[message.guild.id].role;
                roles.push(role.id)
                file[message.guild.id] = {
                    func: true,
                    role: roles
                }
            }
        } else  {
            
            
                file[message.guild.id] = {
                    func: true,
                    role: [r.id]
                }
            
            }
        client.writeFile('autorole.json', file);

        message.channel.send(
            client.createEmbed('success', `Now granting new members the **${role.name}** role`, true, [])
        )

        return;
    };

     if (func === 'remove') {
        const file = require('../../database/autorole.json')

        if (!file[message.guild.id]) {
            return message.channel.send(
                client.createEmbed('fail', 'There\'s no autorole data for this server', true, [])
            )
        }

        const roleToRemove = message.mentions.roles.first() ? message.mentions.roles.first() : args[1]

        if (!roleToRemove) return message.channel.send(client.main);

        if (roleToRemove === args[1]) {
            const nums = [
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '0'
            ]

            nums.some((numbers) => {
                if (!args[1].includes(numbers)) return message.channel.send(client.main);
            })
        }

        let role 

        roleToRemove === args[0] ? role = await message.guild.roles.fetch(roleToRemove.id) : role = await message.guild.roles.fetch(roleToRemove.id);


        const newRoles = [];

        require('../../database/autorole.json')[message.guild.id].role.map((r) => {
            newRoles.push(r);
        })

        const index = newRoles.indexOf(roleToRemove.id);
        if (index > -1) {
            newRoles.splice(index, 1);
        }

        file[message.guild.id] = {
            func: true,
            role: newRoles
        }

        client.writeFile('autorole.json', file);

        return message.channel.send(
            client.createEmbed('success', `Removed **${role}**`, true, [])
        )
    }

    if (func === 'check') {
        const f = require('../../database/autorole.json')

        if (f[message.guild.id]) {
            if (f[message.guild.id].func === true) {
            const rolesToJoin = [];

            require('../../database/autorole.json')[message.guild.id].role.map((r) => {

            rolesToJoin.push(`<@&${r}>`)

            })

            return message.channel.send(
                client.createEmbed('main', `Autorole is \`${f[message.guild.id].func}\` with the role(s) ${rolesToJoin.join(' ')}`, true, [null, null, null])
            )
            } else return message.channel.send(new MessageEmbed().setColor(client.failColor).setDescription(`${client.fail} Autorole is disabled for this server`))

        } else return message.channel.send(new MessageEmbed().setColor(client.failColor).setDescription(`${client.fail} There's no autorole data for this server`))
    }

}
