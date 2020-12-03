const {
    MessageEmbed
} = require("discord.js");
const sendError = require("../util/error");

module.exports.run = async (client, message, args) => {
    let WARNING = client.emojis.cache.find(emoji => emoji.id === '778868936874655774')
    let NOTES = client.emojis.cache.find(emoji => emoji.id === '778877611921244160')
    let PAUSE = client.emojis.cache.find(emoji => emoji.id === '778875419612151808')
        const serverQueue = message.client.queue.get(message.guild.id);
        if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            try {
                serverQueue.connection.dispatcher.pause()
            } catch (error) {
                message.client.queue.delete(message.guild.id);
                return sendError(`${NOTES} The player has stopped and the queue has been cleared.: ${error}`, message.channel);
            }
            let xd = new MessageEmbed()
                .setDescription(`${PAUSE} Paused the music for you!`)
                .setColor("YELLOW")
                .setTitle("Music has been paused!")
            return message.channel.send(xd);
        }
        return sendError(`${WARNING}There is nothing playing in this server.`, message.channel);
    }

	module.exports.config = {
    	name: "pause",
    	aliases: []
}