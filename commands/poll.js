const {
    MessageEmbed
} = require("discord.js");
const sendError = require("../util/error")

module.exports.run = async (client, message, args) => {
    if (!message.member.permissions.has("ADMINISTRATOR"))
      return sendError(`You need to be an Admin or Higher to use this command., ${message.author.username}`, message.channel);
        let pollChannel = message.mentions.channels.first();
        let pollDescription = args.slice(1).join(' ');

        let embedPoll = new MessageEmbed()
        .setTitle('New Poll!')
        .setDescription(pollDescription)
        .setColor('BLUE')
        let msgEmbed = await pollChannel.send(embedPoll);
    await msgEmbed.react("779636383010127883");
    await msgEmbed.react("779636462315372566");
    }

	module.exports.config = {
    	name: "poll",
    	aliases: []
}