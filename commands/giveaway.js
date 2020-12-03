const {
    MessageEmbed
} = require("discord.js");
const sendError = require("../util/error");
const ms = require("ms");

module.exports.run = async (client, message, args) => {
        if (!args[0]) return sendError(`You did not specify your time!`, message.channel);
    if (
      !args[0].endsWith("d") &&
      !args[0].endsWith("h") &&
      !args[0].endsWith("m")
	)
      return sendError(`You did not use the correct formatting for the time!`, message.channel);
    if (isNaN(args[0][0])) return sendError(`That is not a number!`, message.channel);
    let channel = message.mentions.channels.first();
    if (!channel)
      return sendError(`I could not find that channel in the guild!`, message.channel);
    let prize = args.slice(2).join(" ");
    if (!prize) return sendError(`No prize specified!`, message.channel);
    message.channel.send(`*Giveaway created in ${channel}*`);
    let Embed = new MessageEmbed()
      .setTitle(`New giveaway!`)
      .setDescription(
        `The user ${message.author} is hosting a giveaway for the prize of **${prize}**`
	)
      .setTimestamp(Date.now() + ms(args[0]))
      .setColor(`BLUE`);
    let m = await channel.send(Embed);
    m.react("🎉");
    setTimeout(() => {
      if (m.reactions.cache.get("🎉").count <= 1) {
        message.channel.send(`Reactions: ${m.reactions.cache.get("🎉").count}`);
        return sendError(`Not enough people reacted for me to start draw a winner!`, message.channel);
	}

      let winner = m.reactions.cache
        .get("🎉")
        .users.cache.filter((u) => !u.bot)
        .random();
      channel.send(`The winner of the giveaway for **${prize}** is... ${winner}`);
    }, ms(args[0]));
		}

	module.exports.config = {
    	name: "giveaway",
    	aliases: []
}