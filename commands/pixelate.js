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
        let image = await api.Canvas.pixelate(avatar, rn(options));

        let pixelated = new MessageAttachment(image, "pixelated.gif")
        message.channel.send("These pixel images! Makes me want to play arcade games again. Oh wait... I am a bot. I do not play arcade games... Well this is awkward.", pixelated);
		}

	module.exports.config = {
    	name: "pixelate",
    	aliases: []
}