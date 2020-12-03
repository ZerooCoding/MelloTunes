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
		var rn = require('random-number');
		var options = {
  		min:  1,
		max:  100, 
		integer: true
		}
        let image = await api.Canvas.threshold(avatar, rn(options));

        let threshold = new MessageAttachment(image, "threshold.gif")
        message.channel.send("You be processing those digital images? Huh?", threshold);
		}

	module.exports.config = {
    	name: "threshold",
    	aliases: []
}