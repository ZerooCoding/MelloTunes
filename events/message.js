module.exports = async (client, message) => {
    if (message.author.bot) return;

    //Prefixes also have mention match
    	const prefix = require('../util/prefix');
        if (message.author.bot) return;

    const data = await prefix.findOne({
        GuildID: message.guild.id
    });

    const messageArray = message.content.split(' ');
    const cmd = messageArray[0];
    const args = messageArray.slice(1);

    if(data) {
        const prefix = data.Prefix;

        if (!message.content.startsWith(prefix)) return;
        const commandfile = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
        commandfile.run(client, message, args);
    } else if (!data) {
        const prefix = ".";
        
        if (!message.content.startsWith(prefix)) return;
        const commandfile = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
        commandfile.run(client, message, args);
    if(message.author.bot || message.channel.type === "dm") return;
}

    if(message.channel.type === "dm")return message.channel.send("None of the commands work in DMs. So please use commands in server!")
    process.on("unhandledRejection", (reason, promise) => {
        try {
            console.error("Unhandled Rejection at: ", promise, "reason: ", reason.stack || reason);
        } catch {
            console.error(reason);
        }
    });
    require('events').EventEmitter.defaultMaxListeners = 25
}
