const {
    MessageEmbed
} = require('discord.js')

module.exports = async (client, member) => {
    let msg = [
        `${member} just left the server - glhf!`,
        `${member} just left. Everyone, look lazy!`,
        `${member} just left. Can I get a kill?`,
        `${member} left your party.`,
        `Ermagherd. ${member} is gone.`,
        `Goodbye, ${member}. We hope you left pizza.`,
        `A wild ${member} vanished.`,
        `Swoooosh. ${member} just took off.`,
        `Brace yourselves. ${member} just left the server.`,
        `${member} just left. Seems weak - please nerf.`,
        `${member} just left the server.`,
        `Ha! ${member} has left! You deactived my trap card!`,
        `Hey! Listen! ${member} has left!`,
        `${member} has left the server! It's not effective!`,
        `${member} has left. Party's over.`,
        `${member} has left. Could've stayed a while and listened!`,
        `Roses are red, violets are blue, ${member} left this server with you`,
    ];
    let index = (Math.floor(Math.random() * Math.floor(msg.length)));
    let embed = new MessageEmbed()
        .setColor("WHITE")
        .setDescription(`${msg[index]}`)
        .setFooter("Goodbye!")

    const goodbyeChannel = member.guild.channels.cache.find(ch => ch.id === 'channel-id-here');
    goodbyeChannel.send(embed)
}
