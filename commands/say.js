const sendError = require("../util/error");

module.exports.run = async (client, message, args) => {
    if (!message.member.permissions.has("ADMINISTRATOR")) return;
    let MSG = args.join(' ');
    if (!MSG)
      return sendError(`You did not specify your message to send!`, message.channel);
    message.channel.send(MSG);
    message.delete();
  		}

	module.exports.config = {
    	name: "say",
    	aliases: []
}
