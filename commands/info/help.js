const { MessageEmbed, Client, Message } = require('discord.js');
const recon = require('reconlx')

const { ReactionPages } = recon

module.exports.config = {
    name: "help",
    group: "info",
    usage: 'help',
    guarded: true,
    example: ".help",
    argsCount: 0,
    botperms: ["EMBED_LINKS"],
    description: "Help menu for all commands"
}

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {*} args 
 */

module.exports.run = async (client, message, args) => {

    try {
        let pu = await client.commands.get(args[0]) || await client.commands.get(client.aliases.get(args[0]))

        if (client.commands.has(args[0]) || client.commands.has(client.commands.get(client.aliases.get(args[0]).config.name))) {

            let cmdExample

            if (pu.config.example) {
                if (typeof pu.config.example === 'string') {
                    cmdExample = pu.config.example
                } else {
                    cmdExample = `\n${pu.config.example.join('\n')}`
                }
            }


            return message.channel.send(
                new MessageEmbed()
                    .setColor(client.color)
                    .setTitle(`Command: ${pu.config.name}`)
                    .setDescription(`**Description:** ${pu.config.description} \n**Cooldown:** ${pu.config.cooldown || 3} second(s) ${pu.config.aliases ? '\n' : ''}${pu.config.aliases ? `**Aliases:** ${pu.config.aliases.join(', ')}` : ''}${pu.config.permissions ? `\n**Permissions:** ${pu.config.permissions.join(', ')}` : ""}${pu.config.argsCount ? `\n**Args count:** ${pu.config.argsCount}` : ""}${pu.config.guarded ? `\n**Guarded:** ${pu.config.guarded}` : ""}${pu.config.nsfw ? `\n**Nsfw:** ${pu.config.nsfw}` : ""}${pu.config.serverOwnerOnly ? `\n**Server owner only:** ${pu.config.serverOwnerOnly}` : ""}${pu.config.usage ? `\n**Usage:** ${pu.config.usage}` : ""} ${pu.config.example ? `\n**Example:** ${cmdExample}` : ""}`)
            )

        } else {

        }
    } catch (e) { /*console.log(e)*/ }

    if (!args[0]) {

        const mainEmbed = new MessageEmbed()
            .setColor(client.color)

        const groupsJoin = [];

        let count = 1;
        client.groups.map((g) => {
            count++
            if (g === 'owners' && !require('../../config/bot.json').owners.includes(message.author.id)) return;
            groupsJoin.push(`${count} ${g} - **Shows ${g} commands**`)

        })

        mainEmbed.setDescription(`${client.botName} bot \n \n Type \`help [command]\` for help with a command \n\n ${groupsJoin.join('\n')}`, true)


        function createEmbed(name) {
            const embed = new MessageEmbed()
                .setColor(client.color).setThumbnail(client.mainURL)
            let array = []
            client.commands.map((command) => {
                if (command.config.group === name) {
                    if (command.config.hidden !== true) {
                        array.push(`\`${command.config.name}\` - ${command.config.description}`)
                    }
                }
            })
            embed.setDescription(`**_${name} commands_** \n \n ${array.join('\n')}`)
            return embed;
        }

        const ownersEmbed = createEmbed('owners')
        const utilityEmbed = createEmbed('utility')
        const moderationEmbed = createEmbed('moderation')
        const funEmbed = createEmbed('fun')
        const miscEmbed = createEmbed('misc')
        const infoEmbed = createEmbed('info')
        const managementEmbed = createEmbed('management')
        const configEmbed = createEmbed('config')

        const pages = [mainEmbed, moderationEmbed, utilityEmbed, infoEmbed, miscEmbed, funEmbed, configEmbed, managementEmbed]

        if (require('../../config/bot.json').owners.includes(message.author.id)) pages.push(ownersEmbed)

        // ReactionPages(message, pages, true)

        const paginationEmbed = require('discord.js-pagination')

        paginationEmbed(message, pages);




    };
};




















































/*
const { MessageEmbed, Client, Message } = require('discord.js');
const recon = require('reconlx')

const { ReactionPages } = recon

module.exports.config = {
    name: "help",
    group: "info",
    usage: 'help',
    guarded: true,
    example: ".help",
    argsCount: 0,
    botperms: ["EMBED_LINKS"],
    description: "Help menu for all commands"
}


 module.exports.run = async (client, message, args) => {

    try {
        let pu = await client.commands.get(args[0]) || await client.commands.get(client.aliases.get(args[0]))

        if (client.commands.has(args[0]) || client.commands.has(client.commands.get(client.aliases.get(args[0]).config.name))) {


            return message.channel.send(`

${pu.config.name ? `**Name:** ${pu.config.name}` : ""}${pu.config.description ? '\n' : ""}${pu.config.description ? `**Description:** ${pu.config.description}` : ""}${pu.config.aliases ? '\n' : ""}${pu.config.aliases ? `**Aliases:** ${pu.config.aliases.join(', ')}` : ""}\n**Cooldown:** ${pu.config.cooldown ? pu.config.cooldown : 3} second(s)${pu.config.group ? '\n' : ""}${pu.config.group ? `**Group:** ${pu.config.group}` : ""}${pu.config.permissions ? '\n' : ''}${pu.config.permissions ? `**Permissions:** ${pu.config.permissions.join(', ').toLocaleLowerCase()}` : ""}${pu.config.argsCount ? '\n' : ""}${pu.config.argsCount ? `**Args Count:** ${pu.config.argsCount}` : ""}${pu.config.usage ? '\n' : ""}${pu.config.usage ? `**Usage:** ${pu.config.usage}` : ""}${pu.config.serverOwnerOnly ? '\n' : ""}${pu.config.serverOwnerOnly ? `**Server owner only:** ${pu.config.serverOwnerOnly}` : ""}${pu.config.example ? "\n" : ""}${pu.config.example ? `**Example:** ${pu.config.example || pu.config.example.join(', ')}` : ""}

                `)

        } else {

        }
    } catch { }

    if (!args[0]) {

        const mainEmbed = new MessageEmbed()
            .setColor(client.color)
        //   .setDescription(`_${client.botName}_ \n \n Type \`${client.prefix}help [command]\` for help with a command \n \n ${client.prefix}`)

        const groupsJoin = [];

        // client.groups.map((group) => {
            let count = 1;
             client.groups.map((g) => {
                count++
                if (g === 'owners' && !require('../../config/bot.json').owners.includes(message.author.id)) return;
                 groupsJoin.push(`${count} ${g} - **Shows ${g} commands**`)

         })

             mainEmbed.setDescription(`${client.botName} bot \n \n Type \`help [command]\` for help with a command \n\n ${groupsJoin.join('\n')}`, true)


         function createEmbed(name) {
            const embed = new MessageEmbed()
            .setColor(client.color).setThumbnail(client.mainURL)
            let array = []
             client.commands.map((command) => {
                 if (command.config.group === name) {
                        if (command.config.hidden !== true) {
                            array.push(`\`${command.config.name}\` - ${command.config.description}`)
                        }
                 }
             })
             embed.setDescription(`**_${name} commands_** \n \n ${array.join('\n')}`)
             return embed;
            }

        const ownersEmbed = createEmbed('owners')
        const utilityEmbed = createEmbed('utility')
        const moderationEmbed = createEmbed('moderation')
        const funEmbed = createEmbed('fun')
        const miscEmbed = createEmbed('misc')
        const infoEmbed = createEmbed('info')
        const managementEmbed = createEmbed('management')
        const configEmbed = createEmbed('config')

        const pages = [mainEmbed, moderationEmbed, utilityEmbed, infoEmbed, miscEmbed, funEmbed, configEmbed, managementEmbed]

        if (require('../../config/bot.json').owners.includes(message.author.id)) pages.push(ownersEmbed)

       // ReactionPages(message, pages, true)

       const paginationEmbed = require('discord.js-pagination')

       paginationEmbed(message, pages);




        };




}
*/