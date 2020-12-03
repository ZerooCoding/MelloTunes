const {
    MessageEmbed
} = require('discord.js')

module.exports.run = async (client, message, args) => {
    let channel = client.channels.cache.get('channel-id'); //Replace channel-id with the channel id 
    let msg = args.join(" ");
    let embed = new MessageEmbed()
        .setColor("WHITE")
        .setDescription(`**Bug**:${msg}`)
        .setFooter("Pesky bugs!")

    channel.send(embed);
        message.reply(`The bug has been reported`)
}

	module.exports.config = {
    	name: "report",
    	aliases: []
}
