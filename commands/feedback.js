const {
    MessageEmbed
} = require('discord.js')

module.exports.run = async (client, message, args) => {
    let CHECK_MARK = client.emojis.cache.find(emoji => emoji.id === '778889804426248194')
    let channel = client.channels.cache.get('778137776712318996');
    let msg = args.join(" ");
    let embed = new MessageEmbed()
        .setColor("WHITE")
        .setDescription(`**Suggestion**:${msg}`)
        .setFooter("Interesting.")

    channel.send(embed);
        message.reply(`Your feedback has been sent${CHECK_MARK}`)
}

	module.exports.config = {
    	name: "suggest",
    	aliases: []
}