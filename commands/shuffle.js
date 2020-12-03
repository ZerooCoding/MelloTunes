const {
    Util,
    MessageEmbed
} = require("discord.js");
const { 
    canModifyQueue 
} = require("../util/canModifyQueue");
const sendError = require("../util/error");

module.exports.run = async (client, message, args) => {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send(`Try playing some songs first!`).catch(console.error);
    if (!canModifyQueue(message.member)) return;

    let songs = serverQueue.songs;
    for (let i = songs.length - 1; i > 1; i--) {
      let j = 1 + Math.floor(Math.random() * i);
      [songs[i], songs[j]] = [songs[j], songs[i]];
    }
    serverQueue.songs = songs;
    message.client.queue.set(message.guild.id, serverQueue);
    serverQueue.textChannel.send(`${message.author} shuffled the queue`).catch(console.error);
  }

	module.exports.config = {
    	name: "shuffle",
    	aliases: []
}
