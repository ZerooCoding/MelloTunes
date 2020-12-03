const {
    MessageEmbed
} = require("discord.js");
const sendError = require("../util/error");

module.exports.run = async (client, message, args) => {
        const queue = message.client.queue.get(message.guild.id);
        if (!queue) return sendError("There is no queue.", message.channel).catch(console.error);
        if (!args.length) return sendError(`Usage: ${client.config.prefix}\`remove <Queue Number>\``);
        if (isNaN(args[0])) return sendError(`Usage: ${client.config.prefix}\`remove <Queue Number>\``);

        const song = queue.songs.splice(args[0] - 1, 1);
        sendError(`**|** Removed: **\`${song[0].title}\`** from the queue.`, queue.textChannel).catch(console.error);;
        message.react("👌")

    }

	module.exports.config = {
    	name: "rm",
    	aliases: []
}
