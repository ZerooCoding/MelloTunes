const {
    MessageEmbed
} = require("discord.js");
const sendError = require("../util/error");

module.exports.run = async (client, message, args) => {

    const { guild } = message

    const { name, region, memberCount, owner, afkTimeout } = guild
    const icon = guild.iconURL()

    const embed = new MessageEmbed()
      .setTitle(`Server info for "${name}"`)
      .setThumbnail(icon)
      .addFields(
        {
          name: 'Region',
          value: `**${region.toUpperCase()}**`,
        },
        {
          name: 'Members',
          value: `**${memberCount}**`,
        },
        {
          name: 'Owner',
          value: `**${owner.user.tag}**`,
        },
        {
          name: 'AFK Timeout',
          value: `**${afkTimeout / 60}**`,
        }
      )

    message.channel.send(embed)
    }

	module.exports.config = {
    	name: "serverinfo",
    	aliases: []
}