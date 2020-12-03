const {
    MessageEmbed
} = require("discord.js");
const sendError = require("../util/error");
const fs = require('fs');

    module.exports.run = async (client, message, args) => {
        if (message.author.id === '709450665696428124' || message.author.id === '347077478726238228') { //choose who can use this command.
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
                        description: `  **|**  24/7 is **\`${serverQueue.afk === true ? "enabled" : "disabled"}\`**`
                    }
                });
                return fs.writeFile("./24-7.json", JSON.stringify(24), (err) => {
                    if (err) console.error(err);
                });
            };
            return sendError(`There is nothing playing in this server.`, message.channel);
        } else {
            message.reply(`You are not allowed to use this.`)
        }
    }

module.exports.config = {
    name: "24/7",
    aliases: []
}
