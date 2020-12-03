require("dotenv").config();//Loading .env
const fs = require("fs");
Discord.Constants.DefaultOptions.ws.properties.$browser = "Discord Android" //Make it show that the bot is on mobile
const { Collection,
       Client } = require("discord.js");
const prefix = require('./util/prefix');

const client = new Client();//Making a discord bot client
client.commands = new Collection();//Making client.commands as a Discord.js Collection
client.queue = new Map()
client.snipes = new Discord.Collection();
client.config = {
  prefix: process.env.PREFIX
}
client.aliases = new Discord.Collection();

client.on('messageDelete', function(message, channel){
  
  client.snipes.set(message.channel.id, {
    content:message.content,
    author:message.author.tag,
    image:message.attachments.first() ? message.attachments.first().proxyURL : null
  })
})

const mongoose = require('mongoose');
mongoose.connect('key-here', { //Go to https://cloud.mongodb.com, CLick create a cluster, When it finishes, CLick Database Access, Click ADD NEW DATABASE USER, 1st field is the username of the bot, You can change it to anything you want, 2nd field is the password, Make sure you have this 2nd field copied you will need it again, Click Add User, Click Network Access, Click ADD IP ADDRESS, Click ALLOW ACCESS FROM ANYWHERE if you are using an VPS if you are not then Click ADD CURRENT IP ADDRESS, Click Confirm, When it finishes Click Clusters, Click CONNECT, Click Connect your application, Now you will see seomthing like mongodb+srv://MelloBot:<password>@mellotunes.kclv7.mongodb.net/<dbname>?retryWrites=true&w=majority, Replace <password> with the 2nd field that I talked about before, Replace <dbname> with the 1st field from before.
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to DATABASE.');
}).catch((err) => {
    console.log(`Unable to connect to database, error: ${err}`);
});

//Loading Events
fs.readdir(__dirname + "/events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(__dirname + `/events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    console.log("Loading Event: "+eventName)
  });
});

//Loading Commands
fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
    console.log("Loading Command: "+commandName)
  });
});
//Logging in to discord
client.login(process.env.TOKEN)
