const {
    MessageEmbed
} = require("discord.js");
const sendError = require("../util/error");

module.exports.run = async (client, message, args) => {
    	let WARNING = client.emojis.cache.find(emoji => emoji.id === '778868936874655774')
    	let CHECK_MARK = client.emojis.cache.find(emoji => emoji.id === '778889804426248194')
        let STOP = client.emojis.cache.find(emoji => emoji.id === '780290077237968907')
        let PLAY = client.emojis.cache.find(emoji => emoji.id === '778881750029434905')
        let NOTES = client.emojis.cache.find(emoji => emoji.id === '778877611921244160')
        const channel = message.member.voice.channel;
        if (!channel) return sendError(`${WARNING}You need to be in a voice channel to change volume!`, message.channel);
        const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue) return sendError(`${WARNING}There is nothing playing in this server.`, message.channel);
        if (!args[0]) return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
        if (isNaN(args[0])) return message.channel.send(`${NOTES} Numbers only!`).catch(err => console.log(err));
        if (parseInt(args[0]) > 150 || (args[0]) < 0) return sendError(`${WARNING}You can't set the volume more than 150. or lower than 0`, message.channel).catch(err => console.log(err));
        serverQueue.volume = args[0];
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
        let xd = new MessageEmbed()
            .setDescription(`I set the volume to: **${args[0]/1}/100**`)
            .setAuthor("Server Volume Manager", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
            .setColor("BLUE")
        return message.channel.send(xd);
    }

	module.exports.config = {
    	name: "volume",
    	aliases: []
}