const {
    MessageEmbed
} = require('discord.js')

module.exports.run = async (client, message, args) => {
	let CHECK_MARK = client.emojis.cache.find(emoji => emoji.id === '778889804426248194')
    let channel = client.channels.cache.get('778137897546285067');
    let msg = args.join(" ");
    let embed = new MessageEmbed()
        .setColor("WHITE")
        .setDescription(`**Bug**:${msg}`)
        .setFooter("Pesky bugs!")

    channel.send(embed);
        message.reply(`The bug has been reported${CHECK_MARK}`)
}

	module.exports.config = {
    	name: "report",
    	aliases: []
}