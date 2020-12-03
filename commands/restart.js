const {
    MessageEmbed
} = require("discord.js");
const sendError = require("../util/error")

module.exports.run = async (client, message, args) => {
        if (message.author.id === '709450665696428124' || message.author.id === '347077478726238228') { //Replace the '709450665696428124' and '347077478726238228' with who you want to use this command.
        await message.channel.send(`Restarting bot...`)
        process.exit();
        client.login(process.env.token)
        } else {
            return sendError(`You cannot use this command`, message.channel)
		}
    }

	module.exports.config = {
    	name: "restart",
    	aliases: []
}
