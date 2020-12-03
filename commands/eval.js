const { 
    Client, 
    MessageEmbed 
} = require('discord.js');
module.exports.run = async (client, message, args) => {
 if(message.author.id === '709450665696428124' || message.author.id === '347077478726238228') {

    const embed = new MessageEmbed().setTitle(`${message.author.tag}'s eval`).setDescription("📥Eval📤").setFooter(`requested by ${message.author.tag}`).addField(

      "Input📥",

      "```\n" + args.join(" ") + "```"

    );

    try {

      const code = args.join(" ");

      if (!code) return message.channel.send(new Discord.MessageEmbed() .setTitle('📥Eval📤') .setDescription('Please include the code'));

      let evaled;

      // This method is to prevent someone that you trust, open the secret shit here.
 
      if (

        code.includes(`secret`) ||

        code.includes(`token`) ||

        code.includes("process.env")

      ) {

        evaled = "No, shut up, what will you do it with the token?";

      } else {

        evaled = eval(code);

      }

      if (typeof evaled !== "string")

        evaled = require("util").inspect(evaled, { depth: 0 });

      let output = clean(evaled);

      if (output.length > 1024) {

        // If the output was more than 1024 characters, we're gonna export them into the hastebin.

        const { body } = await post("https://hastebin.com/documents").send(

          output

        );

        embed

          .addField("Output📤", `https://hastebin.com/${body.key}.js`)

          .setColor("#ff6600");

        // Sometimes, the body.key will turn into undefined. It might be the API is under maintenance or broken.

      } else {

        embed.addField("Output📤", "```js\n" + output + "```").setColor("#ff6600");

      }

      message.channel.send(embed);

    } catch (error) {

      let err = clean(error);

      if (err.length > 1024) {

        // Do the same like above if the error output was more than 1024 characters.

        const { body } = await post("https://hastebin.com/documents").send(err);

        embed

          .addField("Output📤", `https://hastebin.com/${body.key}.js`)

          .setColor("#ff0000");

      } else {

        embed.addField("Output📤", "```js\n" + err + "```").setColor("#ff0000");

      }

      message.channel.send(embed);

    }

    function clean(string) {

      if (typeof text === "string") {

        return string

          .replace(/`/g, "`" + String.fromCharCode(8203))

          .replace(/@/g, "@" + String.fromCharCode(8203));

      } else {

        return string;

      }

    }
  
} else {
  message.channel.send('you cant use this cmd');
}
  }

	module.exports.config = {
    	name: "eval",
    	aliases: []
}