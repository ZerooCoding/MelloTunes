const {
    Util,
    MessageEmbed
} = require("discord.js");
const sendError = require("../util/error");

module.exports.run = async (client, message, args) => {
        const channel = message.member.voice.channel
        if (!channel) return sendError(`You need to be in a voice channel to skip this song!`, message.channel);
        const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue) return sendError(`There is nothing playing that I could skip for you.`, message.channel);
        if (!serverQueue.connection) return
        if (!serverQueue.connection.dispatcher) return
        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            let xd = new MessageEmbed()
                .setDescription(`Resumed the music for you!`)
                .setColor("YELLOW")
                .setTitle("Music has been Resumed!")

            return message.channel.send(xd).catch(err => console.log(err));

        }

        try {
            serverQueue.connection.dispatcher.end()
        } catch (error) {
            serverQueue.voiceChannel.leave()
            message.client.queue.delete(message.guild.id);
            return sendError(`The player has stopped and the queue has been cleared.: ${error}`, message.channel);
        }
        message.react("👌")
    }

	module.exports.config = {
    	name: "skip",
    	aliases: []
}
