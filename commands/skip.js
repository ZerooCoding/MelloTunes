const {
    Util,
    MessageEmbed
} = require("discord.js");
const sendError = require("../util/error");

module.exports.run = async (client, message, args) => {
        let NOTES = client.emojis.cache.find(emoji => emoji.id === '778877611921244160')
    	let WARNING = client.emojis.cache.find(emoji => emoji.id === '778868936874655774')
    	let CHECK_MARK = client.emojis.cache.find(emoji => emoji.id === '778889804426248194')
        let STOP = client.emojis.cache.find(emoji => emoji.id === '780290077237968907')
        let PLAY = client.emojis.cache.find(emoji => emoji.id === '778881750029434905')
        const channel = message.member.voice.channel
        if (!channel) return sendError(`${WARNING}You need to be in a voice channel to skip this song!`, message.channel);
        const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue) return sendError(`${WARNING}There is nothing playing that I could skip for you.`, message.channel);
        if (!serverQueue.connection) return
        if (!serverQueue.connection.dispatcher) return
        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            let xd = new MessageEmbed()
                .setDescription(`${PLAY} Resumed the music for you!`)
                .setColor("YELLOW")
                .setTitle("Music has been Resumed!")

            return message.channel.send(xd).catch(err => console.log(err));

        }

        try {
            serverQueue.connection.dispatcher.end()
        } catch (error) {
            serverQueue.voiceChannel.leave()
            message.client.queue.delete(message.guild.id);
            return sendError(`${NOTES} The player has stopped and the queue has been cleared.: ${error}`, message.channel);
        }
        message.react("783079533300809778")
    }

	module.exports.config = {
    	name: "skip",
    	aliases: []
}