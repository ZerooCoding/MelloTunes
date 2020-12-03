const {
    MessageAttachment,
    MessageEmbed
} = require("discord.js");
const sendError = require("../util/error")
const api = require('canvacord')

module.exports.run = async (client, message, args) => {
    	let userArray = message.content.split(" ");
    	let userArgs = userArray.slice(1);

    	let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;

        let avatar = member.user.displayAvatarURL({dynamic: false, format: "png"});

        let image = await api.Canvas.sepia(avatar);

        let sepia = new MessageAttachment(image, "sepia.gif")
        message.channel.send("You must love those reddish brown colors. Don't you?", sepia);
		}

	module.exports.config = {
    	name: "sepia",
    	aliases: []
}