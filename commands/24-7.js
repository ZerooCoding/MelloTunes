const {
    MessageEmbed
} = require("discord.js");
const sendError = require("../util/error");
const fs = require('fs');

    module.exports.run = async (client, message, args) => {
    let HOURGLASS = client.emojis.cache.find(emoji => emoji.id === '783231714024751134')
    let WARNING = client.emojis.cache.find(emoji => emoji.id === '778868936874655774')
    let PREMIUM = client.emojis.cache.find(emoji => emoji.id === '783233325606502402')
        if (message.author.id === '709450665696428124' || message.author.id === '347077478726238228') {
            let 24 = JSON.parse(fs.readFileSync("./24-7.json", "utf8"));
            if (!24[message.guild.id]) 24[message.guild.id] = {
                24: false,
            };
            var serverQueue = 24[message.guild.id]
            if (serverQueue) {
                serverQueue.24 = !serverQueue.24;
                message.channel.send({
                    embed: {
                        color: "GREEN",
                        description: `${HOURGLASS}  **|**  24/7 is **\`${serverQueue.afk === true ? "enabled" : "disabled"}\`**`
                    }
                });
                return fs.writeFile("./24-7.json", JSON.stringify(24), (err) => {
                    if (err) console.error(err);
                });
            };
            return sendError(`${WARNING}There is nothing playing in this server.`, message.channel);
        } else {
            message.reply(`${PREMIUM}Only premium people can use this. Make sure to go to https://discord.gg/ZMJFsHWkyX to know more about this "special role" or to just support the bot. You can also boost the server to obtain access to this command.`)
        }
    }

module.exports.config = {
    name: "24/7",
    aliases: []
}