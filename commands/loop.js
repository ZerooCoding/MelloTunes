const {
    MessageEmbed
} = require("discord.js");
const sendError = require("../util/error");

module.exports.run = async (client, message, args) => {
    let LOOP = client.emojis.cache.find(emoji => emoji.id === '778876617744318484')
    let WARNING = client.emojis.cache.find(emoji => emoji.id === '778868936874655774')
        const serverQueue = message.client.queue.get(message.guild.id);
        if (serverQueue) {
            serverQueue.loop = !serverQueue.loop;
            return message.channel.send({
                embed: {
                    color: "GREEN",
                    description: `${LOOP}  **|**  Loop is **\`${serverQueue.loop === true ? "enabled" : "disabled"}\`**`
                }
            });
        };
        return sendError(`${WARNING}There is nothing playing in this server.`, message.channel);
    }

	module.exports.config = {
    	name: "loop",
    	aliases: []
}