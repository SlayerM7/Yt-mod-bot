module.exports.config = { 
    // Set all config settings for the commands

    name: 'example', // A string of the command name, This is what the user will type
    aliases: [], //  Array of all commands aliases
    group: 'examples', // A string of the commands group, this is the group the command will be registed in 
    description: 'A example description', // A string of the commands description, This is a vital option
    cooldown: 5, // A number of a cooldown for the command (Owners not affected)
    permissions: [], //  A array of permissions needed to use the command 
    botperms: [], // A Array of permissions the bot needs to run the command
    usage: '[@user] <reason>', // A string of how the command should properly be used,
    argsCount: 2, // A Number of how many arguments are checked , Should match usage to a certain extent
    example: '!ban @Slayer Spamming in chat', // A string of a example of how the command should be used
    ownerOnly: false, // A boolean of the command is a owner only command or not
    nsfw: false, // A boolean of the command is nsfw 
    hidden: false, // A boolean of the command must be hidden from the help menu
    guildOnly: true, // A boolean of the command can only be used in a guild (Server)
    guarded: false, // A boolean of wheather the command is guarded against the disable/enable command (So it cant be disabled)
    testOnly: false, // A boolean of wheather the command should be locked to the testing server for test purposes
    serverOwnerOnly: false // A boolean of wheather the command should be locked to the server owner
}   

// Make sure all commands are in the "commands" folder 
 
module.exports.run = async(client, message, args) => {

    // Main function of code , Here's where you put all your code for the command

    message.channel.send('Command works!');
}

// This is the structure of how everything goes down and works 