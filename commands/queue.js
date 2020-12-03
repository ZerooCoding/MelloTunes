const {
    MessageEmbed
} = require("discord.js");
const sendError = require("../util/error");

module.exports.run = async (client, message, args) => {
    	let WARNING = client.emojis.cache.find(emoji => emoji.id === '778868936874655774')
    	let CHECK_MARK = client.emojis.cache.find(emoji => emoji.id === '778889804426248194')
        let STOP = client.emojis.cache.find(emoji => emoji.id === '780290077237968907')
        let PLAY = client.emojis.cache.find(emoji => emoji.id === '778881750029434905')
        const permissions = message.channel.permissionsFor(message.client.user);
        if (!permissions.has(["MANAGE_MESSAGES", "ADD_REACTIONS"]))
            return sendError(`${WARNING}Missing permission to manage messages or add reactions`, message.channel);

        const queue = message.client.queue.get(message.guild.id);
        if (!queue) return sendError(`${WARNING}There is nothing playing in this server.`, message.channel)

        let currentPage = 0;
        const embeds = generateQueueEmbed(message, queue.songs);

        const queueEmbed = await message.channel.send(
            `**\`${currentPage + 1}\`**/**${embeds.length}**`,
            embeds[currentPage]
        );

        try {
            await queueEmbed.react("780289529785090119");
            await queueEmbed.react("780290077237968907");
            await queueEmbed.react("780290625307148329");
        } catch (error) {
            console.error(error);
            message.channel.send(error.message).catch(console.error);
        }

        const filter = (reaction, user) => ["780289529785090119", "780290077237968907", "780290625307148329"].includes(reaction.emoji.id) && message.author.id === user.id;
        const collector = queueEmbed.createReactionCollector(filter, {
            time: 60000
        });

        collector.on("collect", async (reaction, user) => {
            try {
                if (reaction.emoji.id === "780290625307148329") {
                    if (currentPage < embeds.length - 1) {
                        currentPage++;
                        queueEmbed.edit(`**\`${currentPage + 1}\`**/**${embeds.length}**`, embeds[currentPage]);
                    }
                } else if (reaction.emoji.id === "780289529785090119") {
                    if (currentPage !== 0) {
                        --currentPage;
                        queueEmbed.edit(`**\`${currentPage + 1}\`**/**${embeds.length}**`, embeds[currentPage]);
                    }
                } else {
                    collector.stop();
                    reaction.message.reactions.removeAll();
                }
                await reaction.users.remove(message.author.id);
            } catch (error) {
                console.error(error);
                return message.channel.send(error.message).catch(console.error);
            }
        });

function generateQueueEmbed(message, queue) {
    let embeds = [];
    let k = 10;

    for (let i = 0; i < queue.length; i += 10) {
        const current = queue.slice(i, k);
        let j = i;
        k += 10;

        const info = current.map((track) => `**\`${++j}\`** | [\`${track.title}\`](${track.url})`).join("\n");

        const serverQueue = message.client.queue.get(message.guild.id);
        const embed = new MessageEmbed()
            .setAuthor("Server Songs Queue", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
            .setThumbnail(message.guild.iconURL())
            .setColor("BLUE")
            .setDescription(`${info}`)
            .addField("Now Playing", `[${queue[0].title}](${queue[0].url})`, true)
            .addField("Text Channel", serverQueue.textChannel, true)
            .addField("Voice Channel", serverQueue.voiceChannel, true)
            .setFooter("Currently Server Volume is " + serverQueue.volume)
        if (serverQueue.songs.length === 1) embed.setDescription(`No songs to play next add songs by \`\`${message.client.config.prefix}play <song_name>\`\``)

        embeds.push(embed);
    }
    return embeds;
	}
}
	module.exports.config = {
    	name: "queue",
    	aliases: []
}