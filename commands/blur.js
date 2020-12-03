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

        let image = await api.Canvas.blur(avatar);

        let blur = new MessageAttachment(image, "blur.gif")
        message.channel.send("Where are my glasses? Wait do I wear glasses?", blur);
		}
module.exports.config = {
    name: "blur",
    aliases: []
}