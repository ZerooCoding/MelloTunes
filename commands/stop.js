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
        const channel = message.member.voice.channel
        if (!channel) return sendError(`${WARNING}You need to be in a voice channel to play music!`, message.channel);
        const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue) return sendError(`${WARNING}There is nothing playing that I could stop for you.`, message.channel);
        if (!serverQueue.connection) return
        if (!serverQueue.connection.dispatcher) return
        try {
            serverQueue.connection.dispatcher.end();
        } catch (error) {
            message.guild.me.voice.channel.leave();
            message.client.queue.delete(message.guild.id);
            return sendError(`${NOTES} The player has stopped and the queue has been cleared.: ${error}`, message.channel);
        }
        message.client.queue.delete(message.guild.id);
        serverQueue.songs = [];
        message.react("778889804426248194")
    }

	module.exports.config = {
    	name: "stop",
    	aliases: []
}