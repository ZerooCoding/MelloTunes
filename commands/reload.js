const {
    MessageEmbed
} = require("discord.js");
const sendError = require("../util/error")

module.exports.run = async (client, message, args) => {

if(message.author.id === '709450665696428124') {
    let commandName = args[0].toLowerCase()
    try {
        delete require.cache[require.resolve(`./${commandName}.js`)]
        client.commands.delete(commandName)
        let pull = require(`./${commandName}.js`)
        client.commands.set(commandName, pull)
    } catch(e) {
        return sendError(`Could not reload: \`${args[0].toUpperCase()}\` Command`, message.channel)
    }
    message.channel.send(`✔️\`${args[0].toUpperCase()}\` Command has been reloaded!`)
} else {
sendError(`Only RT and Mezo can use this command.`)
}
        
	}

	module.exports.config = {
    	name: "reload",
    	aliases: []
}