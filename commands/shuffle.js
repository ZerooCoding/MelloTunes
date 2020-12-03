const {
    Util,
    MessageEmbed
} = require("discord.js");
const { 
    canModifyQueue 
} = require("../util/canModifyQueue");
const sendError = require("../util/error");

module.exports.run = async (client, message, args) => {
    	let WARNING = client.emojis.cache.find(emoji => emoji.id === '778868936874655774')
    	let CHECK_MARK = client.emojis.cache.find(emoji => emoji.id === '778889804426248194')
        let STOP = client.emojis.cache.find(emoji => emoji.id === '780290077237968907')
        let PLAY = client.emojis.cache.find(emoji => emoji.id === '778881750029434905')
        let SHUFFLE = client.emojis.cache.find(emoji => emoji.id === '778883423921504256')
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send(`${WARNING}Try playing some songs first!`).catch(console.error);
    if (!canModifyQueue(message.member)) return;

    let songs = serverQueue.songs;
    for (let i = songs.length - 1; i > 1; i--) {
      let j = 1 + Math.floor(Math.random() * i);
      [songs[i], songs[j]] = [songs[j], songs[i]];
    }
    serverQueue.songs = songs;
    message.client.queue.set(message.guild.id, serverQueue);
    serverQueue.textChannel.send(`${message.author} ${SHUFFLE} shuffled the queue`).catch(console.error);
  }

	module.exports.config = {
    	name: "shuffle",
    	aliases: []
}