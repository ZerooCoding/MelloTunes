const {
    MessageEmbed
} = require("discord.js");
const sendError = require("../util/error");

module.exports.run = async (client, message, args) => {
    const msg = client.snipes.get(message.channel.id)
    if(!msg) return sendError("There are no deleted messages in this channel!", message.channel)
    const embed = new MessageEmbed()
    .setAuthor(msg.author)
    .setDescription(msg.content)
    if(msg.image)embed.setImage(msg.image)
    
    message.channel.send(embed)    	
    	}

	module.exports.config = {
    	name: "snipe",
    	aliases: []
}