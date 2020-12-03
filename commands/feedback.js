const {
    MessageEmbed
} = require('discord.js')

module.exports.run = async (client, message, args) => {
    let channel = client.channels.cache.get('channel-id'); //Replace channel-id with the channel id you want it to send the message to.
    let msg = args.join(" ");
    let embed = new MessageEmbed()
        .setColor("WHITE")
        .setDescription(`**Suggestion**:${msg}`)
        .setFooter("Interesting.")

    channel.send(embed);
        message.reply(`Your feedback has been sent.`)
}

	module.exports.config = {
    	name: "suggest",
    	aliases: []
}
