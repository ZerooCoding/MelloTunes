const {
    Util,
    MessageEmbed
} = require("discord.js");
const ytdl = require("ytdl-core");
const yts = require("yt-search");
const ytdlDiscord = require("ytdl-core-discord");
const youtube = require("youtube-sr");
const sendError = require("../util/error")
const fs = require('fs');

module.exports.run = async (client, message, args) => {
    	let WARNING = client.emojis.cache.find(emoji => emoji.id === '778868936874655774')
    	let CHECK_MARK = client.emojis.cache.find(emoji => emoji.id === '778889804426248194')
        let STOP = client.emojis.cache.find(emoji => emoji.id === '780290077237968907')
        let PLAY = client.emojis.cache.find(emoji => emoji.id === '778881750029434905')
        const channel = message.member.voice.channel;
        if (!channel) return sendError(`${WARNING}You need to be in a voice channel to play music!`, message.channel);
        const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
        var searchString = args.join(" ");
        const permissions = channel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT")) return sendError(`${WARNING}I cannot connect to your voice channel, make sure I have the proper permissions!`, message.channel);
        if (!permissions.has("SPEAK")) return sendError(`${WARNING}I cannot speak in this voice channel, make sure I have the proper permissions!`, message.channel);

        if (!searchString || !url) return sendError(`Usage: ${message.client.config.prefix}playlist <YouTube Playlist URL | Playlist Name>`, message.channel);
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            try {
                const playlist = await youtube.getPlaylist(url);
                if (playlist === null) return sendError(`${WARNING}Playlist not found`, message.channel)
                const videos = await playlist.videos;
                for (const video of videos) {
                    // eslint-disable-line no-await-in-loop
                    await handleVideo(video, message, channel, true); // eslint-disable-line no-await-in-loop
                }
                return message.channel.send({
                    embed: {
                        color: "GREEN",
                        description: `${CHECK_MARK}  **|**  Playlist: **\`${playlist.title}\`** has been added to the queue`
                    }
                })
            } catch (error) {
                console.error(error);
                return sendError(`${WARNING}Playlist not found`, message.channel).catch(console.error);
            }
        } else {
            try {
                var searched = await yts.search(searchString)

                if (searched.playlists.length === 0) return sendError(`${WARNING}I was unable to find the playlist on YouTube`, message.channel)
                var songInfo = searched.playlists[0]
                let listurl = songInfo.url;
                const playlist = await youtube.getPlaylist(listurl);
                const videos = await playlist.videos;
                for (const video of videos) {
                    // eslint-disable-line no-await-in-loop
                    await handleVideo(video, message, channel, true); // eslint-disable-line no-await-in-loop
                }
                let thing = new MessageEmbed()
                    .setAuthor(`Playlist has been added to queue`, "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
                    .setThumbnail(playlist.thumbnail.url)
                    .setColor("GREEN")
                    .setDescription(`${CHECK_MARK}  **|**  Playlist: **\`${playlist.title}\`** has been added to the queue`)
                return message.channel.send(thing)
            } catch (error) {
                console.error(error);
                return sendError(`${WARNING}An unexpected error has occurred`, message.channel).catch(console.error);
            }
        }

        async function handleVideo(video, message, channel, playlist = false) {
            const serverQueue = message.client.queue.get(message.guild.id);
            const song = {
                id: video.id,
                title: Util.escapeMarkdown(video.title),
                views: String(video.views).padStart(10, ' '),
                ago: video.ago ? video.ago : "Playlist",
                duration: video.durationFormatted,
                url: `https://www.youtube.com/watch?v=${video.id}`,
                img: video.thumbnail.url,
                req: message.author
            };
            if (!serverQueue) {
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

                try {
                    var connection = await channel.join();
                    queueConstruct.connection = connection;
                    play(message.guild, queueConstruct.songs[0]);
                } catch (error) {
                    console.error(`I could not join the voice channel: ${error}`);
                    message.client.queue.delete(message.guild.id);
                    return sendError(`${WARNING}I could not join the voice channel: ${error}`, message.channel);

                }
            } else {
                serverQueue.songs.push(song);
                if (playlist) return;
                let thing = new MessageEmbed()
                    .setAuthor(`${CHECK_MARK}Song has been added to queue`, "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
                    .setThumbnail(song.img)
                    .setColor("YELLOW")
                    .addField("Name", song.title, true)
                    .addField("Duration", song.duration, true)
                    .addField("Requested by", song.req.tag, true)
                    .setFooter(`Views: ${song.views} | ${song.ago}`)
                return message.channel.send(thing);
            }
            return;
        }

        async function play(guild, song) {
            const serverQueue = message.client.queue.get(message.guild.id);
            let afk = JSON.parse(fs.readFileSync("./afk.json", "utf8"));
            if (!afk[message.guild.id]) afk[message.guild.id] = {
                afk: false,
            };
            var online = afk[message.guild.id]
            if (!song) {
                if (!online.afk) {
                    sendError(`${STOP}Leaving the voice channel because I think there are no songs in the queue. If you like the bot stay 24/7 in voice channel run \`.afk\``, message.channel)
                    message.guild.me.voice.channel.leave(); //If you want your bot stay in vc 24/7 remove this line :D
                    message.client.queue.delete(message.guild.id);
                }
                return message.client.queue.delete(message.guild.id);
            }
            let stream = null;
            if (song.url.includes("youtube.com")) {
                stream = await ytdl(song.url);
                stream.on('error', err => {
                    if (serverQueue) {
                        serverQueue.songs.shift();
                        play(serverQueue.songs[0]);
                    }

                    sendError(`${WARNING}An unexpected error has occurred.\nPossible type \`${err}\``, message.channel)
                    return;
                });
            }
            serverQueue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));
            const dispatcher = serverQueue.connection
                .play(ytdl(song.url, {
                    quality: 'highestaudio',
                    highWaterMark: 1 << 25,
                    type: "opus"
                }))
                .on("finish", () => {
                    const shiffed = serverQueue.songs.shift();
                    if (serverQueue.loop === true) {
                        serverQueue.songs.push(shiffed);
                    };
                    play(guild, serverQueue.songs[0]);
                })

            dispatcher.setVolume(serverQueue.volume / 100);
            let thing = new MessageEmbed()
                .setAuthor(`Started Playing Music!`, "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
                .setThumbnail(song.img)
                .setColor("BLUE")
                .addField("Name", song.title, true)
                .addField("Duration", song.duration, true)
                .addField("Requested by", song.req.tag, true)
                .setFooter(`Views: ${song.views} | ${song.ago}`)
            serverQueue.textChannel.send(thing);
        }
    }

	module.exports.config = {
    	name: "playlist",
    	aliases: []
}