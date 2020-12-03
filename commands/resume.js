const {
    MessageEmbed
} = require("discord.js");
const sendError = require("../util/error");

module.exports.run = async (client, message, args) => {
    	let WARNING = client.emojis.cache.find(emoji => emoji.id === '778868936874655774')
    	let CHECK_MARK = client.emojis.cache.find(emoji => emoji.id === '778889804426248194')
        let STOP = client.emojis.cache.find(emoji => emoji.id === '780290077237968907')
        let PLAY = client.emojis.cache.find(emoji => emoji.id === '778881750029434905')
        const serverQueue = message.client.queue.get(message.guild.id);
        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            let xd = new MessageEmbed()
                .setDescription(`${PLAY} Resumed the music for you!`)
                .setColor("YELLOW")
                .setAuthor("Music has been Resumed!", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
            return message.channel.send(xd);
        }
        return sendError(`${WARNING}There is nothing playing in this server.`, message.channel);
    }

	module.exports.config = {
    	name: "resume",
    	aliases: []
}