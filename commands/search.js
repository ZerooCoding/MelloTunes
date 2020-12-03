const {
    Util,
    MessageEmbed
} = require("discord.js");
const ytdl = require("ytdl-core");
const yts = require("yt-search");
const ytdlDiscord = require("ytdl-core-discord");
const YouTube = require("youtube-sr");
const sendError = require("../util/error")
const fs = require('fs');

module.exports.run = async (client, message, args) => {
    	let WARNING = client.emojis.cache.find(emoji => emoji.id === '778868936874655774')
    	let CHECK_MARK = client.emojis.cache.find(emoji => emoji.id === '778889804426248194')
        let STOP = client.emojis.cache.find(emoji => emoji.id === '780290077237968907')
        let PLAY = client.emojis.cache.find(emoji => emoji.id === '778881750029434905')
        let X_MARK = client.emojis.cache.find(emoji => emoji.id === '780288160571457536')
        let channel = message.member.voice.channel;
        if (!channel) return sendError(`${WARNING}You need to be in a voice channel to play music!`, message.channel);

        const permissions = channel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT")) return sendError(`${WARNING}I cannot connect to your voice channel, make sure I have the proper permissions!`, message.channel);
        if (!permissions.has("SPEAK")) return sendError(`${WARNING}I cannot speak in this voice channel, make sure I have the proper permissions!`, message.channel);

        var searchString = args.join(" ");
        if (!searchString) return sendError(`${WARNING}You didn't provide anything for me to search for`, message.channel);

        var serverQueue = message.client.queue.get(message.guild.id);
        try {
            var searched = await YouTube.search(searchString, {
                limit: 10
            });
            if (searched[0] == undefined) return sendError(`${WARNING}I was unable to find the song on YouTube`, message.channel);
            let index = 0;
            let embedPlay = new MessageEmbed()
                .setColor("BLUE")
                .setAuthor(`Results for \"${args.join(" ")}\"`, message.author.displayAvatarURL())
                .setDescription(`${searched.map(video2 => `**\`${++index}\`  |** [\`${video2.title}\`](${video2.url}) - \`${video2.durationFormatted}\``).join("\n")}`)
                .setFooter("Type the number of the song to add it to the playlist");
            // eslint-disable-next-line max-depth
            message.channel.send(embedPlay).then(m => m.delete({
                timeout: 15000
            }))
            try {
                var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
                    max: 1,
                    time: 20000,
                    errors: ["time"]
                });
            } catch (err) {
                console.error(err);
                return message.channel.send({
                    embed: {
                        color: "RED",
                        description: `${X_MARK}Nothing has been selected within 20 seconds, the request has been canceled.`
                    }
                });
            }
            const videoIndex = parseInt(response.first().content);
            var video = await (searched[videoIndex - 1])

        } catch (err) {
            console.error(err);
            return message.channel.send({
                embed: {
                    color: "RED",
                    description: `${X_MARK} **|**  I could not obtain any search results`
                }
            });
        }

        response.delete();
        var songInfo = video

        const song = {
            id: songInfo.id,
            title: Util.escapeMarkdown(songInfo.title),
            views: String(songInfo.views).padStart(10, ' '),
            ago: songInfo.uploadedAt,
            duration: songInfo.durationFormatted,
            url: `https://www.youtube.com/watch?v=${songInfo.id}`,
            img: songInfo.thumbnail.url,
            req: message.author
        };

        if (serverQueue) {
            serverQueue.songs.push(song);
            let thing = new MessageEmbed()
                .setAuthor(`Song has been added to queue`, "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
                .setThumbnail(song.img)
                .setColor("YELLOW")
                .addField("Name", song.title, true)
                .addField("Duration", song.duration, true)
                .addField("Requested by", song.req.tag, true)
                .setFooter(`Views: ${song.views} | ${song.ago}`)
            return message.channel.send(thing);
        }

        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: channel,
            connection: null,
            songs: [],
            volume: 80,
            playing: true,
            loop: false
        };
        message.client.queue.set(message.guild.id, queueConstruct);
        queueConstruct.songs.push(song);

        const play = async (song) => {
            const queue = message.client.queue.get(message.guild.id);
            let afk = JSON.parse(fs.readFileSync("./afk.json", "utf8"));
            if (!afk[message.guild.id]) afk[message.guild.id] = {
                afk: false,
            };
            var online = afk[message.guild.id]
            if (!song) {
                if (!online.afk) {
                    sendError(`Leaving the voice channel because I think there are no songs in the queue. If you like the bot stay 24/7 in voice channel run \`.afk\``, message.channel)
                    message.guild.me.voice.channel.leave(); //If you want your bot stay in vc 24/7 remove this line :D
                    message.client.queue.delete(message.guild.id);
                }
                return message.client.queue.delete(message.guild.id);
            }
            let stream = null;
            if (song.url.includes("youtube.com")) {
                stream = await ytdl(song.url);
                stream.on('error', err => {
                    if (queue) {
                        queue.songs.shift();
                        play(queue.songs[0]);
                    }

                    sendError(`${WARNING}An unexpected error has occurred.\nPossible type \`${err}\``, message.channel)
                    return;
                });
            }
            queue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));
            const dispatcher = queue.connection
                .play(ytdl(song.url, {
                    quality: 'highestaudio',
                    highWaterMark: 1 << 25,
                    type: "opus"
                }))
                .on("finish", () => {
                    const shiffed = queue.songs.shift();
                    if (queue.loop === true) {
                        queue.songs.push(shiffed);
                    };
                    play(queue.songs[0]);
                })

            dispatcher.setVolumeLogarithmic(queue.volume / 100);
            let thing = new MessageEmbed()
                .setAuthor(`Started Playing Music!`, "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
                .setThumbnail(song.img)
                .setColor("BLUE")
                .addField("Name", song.title, true)
                .addField("Duration", song.duration, true)
                .addField("Requested by", song.req.tag, true)
                .setFooter(`Views: ${song.views} | ${song.ago}`)
            queue.textChannel.send(thing);
        };

        try {
            const connection = await channel.join();
            queueConstruct.connection = connection;
            channel.guild.voice.setSelfDeaf(true)
            play(queueConstruct.songs[0]);
        } catch (error) {
            console.error(`I could not join the voice channel: ${error}`);
            message.client.queue.delete(message.guild.id);
            await channel.leave();
            return sendError(`${WARNING}I could not join the voice channel: ${error}`, message.channel);
        }
    }

	module.exports.config = {
    	name: "search",
    	aliases: []
}