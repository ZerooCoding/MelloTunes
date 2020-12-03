const {
    MessageEmbed
} = require('discord.js')

module.exports = async (client, member) => {
    let msg = [
        `${member} just joined the server - glhf!`,
        `${member} just joined. Everyone, look engaged!`,
        `${member} just joined. Can I get a cure?`,
        `${member} joined your lobby.`,
        `${member} joined. You must build extra gateways.`,
        `Ermagherd. ${member} is here.`,
        `Welcome, ${member}. Stay awhile and listen.`,
        `Welcome, ${member}. We were expecting you ( ͡° ͜ʖ ͡°)`,
        `Welcome, ${member}. We hope you brought pizza.`,
        `Welcome ${member}. Leave your weapons by the door.`,
        `A wild ${member} appeared.`,
        `Swoooosh. ${member} just arrived.`,
        `Brace yourselves. ${member} just joined the server.`,
        `${member} just joined. Conceal your bananas.`,
        `${member} just arrived. Seems beat - please nerf.`,
        `${member} just slid into the server.`,
        `A ${member} has spawned in the server.`,
        `Big ${member} showed up!`,
        `Where’s ${member}? In the server!`,
        `${member} hopped into the server. Kangaroo!!`,
        `${member} just showed up. Hold my beer.`,
        `Challenger approaching - ${member} has appeared!`,
        `It's a bird! It's a plane! Nevermind, it's just ${member}.`,
        `It's ${member}! Praise the sun! [T]/`,
        `Never gonna give ${member} up. Never gonna let ${member} down.`,
        `Ha! ${member} has joined! You activated my trap card!`,
        `Cheers, love! ${member}'s here!`,
        `Hey! Listen! ${member} has joined!`,
        `We've been expecting you ${member}`,
        `It's hazardous to go alone, take ${member}!`,
        `${member} has joined the server! It's super effective!`,
        `Cheers, love! ${member} is here!`,
        `${member} is here, as the prediction foretold.`,
        `${member} has arrived. Party's over.`,
        `Ready player ${member}`,
        `${member} is here to kick butt and chew bubblegum. And ${member} is all out of gum.`,
        `Hello. Is it ${member} you're looking for?`,
        `${member} has joined. Stay a while and listen!`,
        `Roses are red, violets are blue, ${member} joined this server with you`,
    ];
    let index = (Math.floor(Math.random() * Math.floor(msg.length)));
    let embed = new MessageEmbed()
        .setColor("WHITE")
        .setDescription(`${msg[index]}`)
        .setFooter("Welcome to the Server!")

    const welcomeChannel = member.guild.channels.cache.find(ch => ch.id === 'channel-id-here');
    welcomeChannel.send(embed)
}
