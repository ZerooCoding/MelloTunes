const {
    MessageEmbed
} = require("discord.js");
const sendError = require("../util/error")

module.exports.run = async (client, message, args) => {
        if (message.author.id === '709450665696428124' || message.author.id === '347077478726238228') {
        await message.channel.send(`Restarting bot...`)
        process.exit();
        client.login(process.env.token)
        } else {
            return sendError(`Only RT and Mezo can use this command.`, message.channel)
		}
    }

	module.exports.config = {
    	name: "restart",
    	aliases: []
}