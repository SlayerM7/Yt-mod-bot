module.exports = (client, member ) => {
    if (client.mutes.has(member.id)) {
        client.muteRisks.add(member.id);
    }
}

module.exports.config = {
    type: 'guildMemberRemove'
}