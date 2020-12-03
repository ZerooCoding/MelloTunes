const {
    MessageEmbed
} = require("discord.js");
const sendError = require("../util/error");

module.exports.run = async (client, message, args) => {
        let X_MARK = client.emojis.cache.find(emoji => emoji.id === '780288160571457536')
    	let WARNING = client.emojis.cache.find(emoji => emoji.id === '778868936874655774')
    	let CHECK_MARK = client.emojis.cache.find(emoji => emoji.id === '778889804426248194')
        let STOP = client.emojis.cache.find(emoji => emoji.id === '780290077237968907')
        let PLAY = client.emojis.cache.find(emoji => emoji.id === '778881750029434905')
        const queue = message.client.queue.get(message.guild.id);
        if (!queue) return sendError("There is no queue.", message.channel).catch(console.error);
        if (!args.length) return sendError(`Usage: ${client.config.prefix}\`remove <Queue Number>\``);
        if (isNaN(args[0])) return sendError(`Usage: ${client.config.prefix}\`remove <Queue Number>\``);

        const song = queue.songs.splice(args[0] - 1, 1);
        sendError(`${X_MARK} **|** Removed: **\`${song[0].title}\`** from the queue.`, queue.textChannel).catch(console.error);;
        message.react("783079533300809778")

    }

	module.exports.config = {
    	name: "rm",
    	aliases: []
}