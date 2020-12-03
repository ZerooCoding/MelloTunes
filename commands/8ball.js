const {
    MessageEmbed
} = require("discord.js");
const sendError = require("../util/error")


module.exports.run = async (client, message, args) => {
 if(!args[0]) {
            sendError('Please ask me a question.', message.channel);
          } else {
              let eightball = require('8ball')()
              message.reply(`🎱${eightball}`)
          }
   		
    }
module.exports.config = {
    name: "8ball",
    aliases: []
}