const {
    MessageEmbed
} = require("discord.js");
const sendError = require("../util/error")

module.exports.run = async (client, message, args) => {
        const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue) return sendError(`There is nothing playing in this server.`, message.channel);
        let song = serverQueue.songs[0]
        let thing = new MessageEmbed()
            .setAuthor("Now Playing", "https://raw.githubusercontent.com/rtgamingwdt/MelloTunes/main/assets/Music.gif")
            .setThumbnail(song.img)
            .setColor("BLUE")
            .addField("Name", song.title, true)
            .addField("Duration", song.duration, true)
            .addField("Requested by", song.req.tag, true)
            .setFooter(`Views: ${song.views} | ${song.ago}`)
        return message.channel.send(thing)
    }

	module.exports.config = {
    	name: "np",
    	aliases: []
}
