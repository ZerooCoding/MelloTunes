const {
    MessageEmbed
} = require("discord.js");
const lyricsFinder = require("lyrics-finder");
const sendError = require("../util/error");

module.exports.run = async (client, message, args) => {
    let WARNING = client.emojis.cache.find(emoji => emoji.id === '778868936874655774')
        const queue = message.client.queue.get(message.guild.id);
        if (!queue) return sendError(`${WARNING}There is nothing playing.`, message.channel).catch(console.error);

        let lyrics = null;

        try {
            lyrics = await lyricsFinder(queue.songs[0].title, "");
            if (!lyrics) lyrics = `${WARNING}No lyrics found for ${queue.songs[0].title}.`;
        } catch (error) {
            lyrics = `No lyrics found for ${queue.songs[0].title}.`;
        }

        let lyricsEmbed = new MessageEmbed()
            .setAuthor(`${queue.songs[0].title} — Lyrics`, "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
            .setThumbnail(queue.songs[0].img)
            .setColor("YELLOW")
            .setDescription(lyrics)
            .setTimestamp();

        if (lyricsEmbed.description.length >= 2048)
            lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
        return message.channel.send(lyricsEmbed).catch(console.error);
    }

	module.exports.config = {
    	name: "lyrics",
    	aliases: []
}