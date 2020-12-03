const {
    MessageEmbed
} = require("discord.js");
const sendError = require("../util/error")
const prefixModel = require("../util/prefix")

module.exports.run = async (client, message, args) => {
if(message.member.hasPermission('ADMINISTRATOR')) {
    const data = await prefixModel.findOne({
        GuildID: message.guild.id
    });
    
    if (!args[0]) return message.channel.send('You must provide a **new prefix**!');
    if (args[0].length > 3) return message.channel.send('Your new prefix must be under \`3\` characters!')
    
    if (data) {
        await prefixModel.findOneAndRemove({
            GuildID: message.guild.id
        })
        
        message.channel.send(`The new prefix is now **\`${args[0]}\`**`);
        
        let newData = new prefixModel({
            Prefix: args[0],
            GuildID: message.guild.id
        })
        newData.save();
    } else if (!data) {
        message.channel.send(`The new prefix is now **\`${args[0]}\`**`);
        
        let newData = new prefixModel({
            Prefix: args[0],
            GuildID: message.guild.id
        })
        newData.save();
    	}
	} else {
    message.reply("You need ADMINISTRATOR perm to use this command.")
    }

    }

	module.exports.config = {
    	name: "setprefix",
    	aliases: []
}