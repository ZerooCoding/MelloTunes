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
        let FF = client.emojis.cache.find(emoji => emoji.id === '778878999819845672')
        if (!args.length || isNaN(args[0]))
            return message.channel.send({
                embed: {
                    color: "GREEN",
                    description: `**Usage**: \`${client.config.prefix}skipto <number>\``
                }

            }).catch(console.error);


        const queue = message.client.queue.get(message.guild.id);
        if (!queue) return sendError(`${WARNING}There is no queue.`, message.channel).catch(console.error);
        if (args[0] > queue.songs.length)
            return sendError(`${WARNING}The queue is only ${queue.songs.length} songs long!`, message.channel).catch(console.error);

        queue.playing = true;

        if (queue.loop) {
            for (let i = 0; i < args[0] - 2; i++) {
                queue.songs.push(queue.songs.shift());
            }
        } else {
            queue.songs = queue.songs.slice(args[0] - 2);
        }
        try {
            queue.connection.dispatcher.end();
        } catch (error) {
            queue.voiceChannel.leave()
            message.client.queue.delete(message.guild.id);
            return sendError(`${NOTES} The player has stopped and the queue has been cleared.: ${error}`, message.channel);
        }

        queue.textChannel.send({
            embed: {
                color: "GREEN",
                description: `${message.author} ${FF} skipped \`${args[0] - 1}\` songs`
            }

        }).catch(console.error);
        message.react("783079533300809778")
    }

	module.exports.config = {
    	name: "skipto",
    	aliases: []
}