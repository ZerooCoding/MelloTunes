const {
    MessageEmbed
} = require("discord.js");
const sendError = require("../util/error")
const api = require('axios');

module.exports.run = async (client, message, args) => {
        const url = 'https://some-random-api.ml/meme';

        let data, response;
        try {
            response = await api.get(url);
            data = response.data;
        } catch (e) {
            return sendError(`An error has occured, try again!`, message.channel)
        }

        const embed = new MessageEmbed()
            .setTitle('Here is a nice meme!')
            .setDescription(data.caption)
            .setColor('#f3f3f3')
            .setImage(data.image)
        	.setFooter('Join our support server! https://discord.io/mellobotsupport')

        await message.channel.send(embed)
		}

	module.exports.config = {
    	name: "meme",
    	aliases: []
}