const {
    MessageEmbed
} = require('discord.js')
const pagination = require('discord.js-pagination');

module.exports.run = async (client, message, args) => {
        const dev = new MessageEmbed()
        .setTitle('Dev')
        .addField('`.eval <code>`', 'Execute code with one command. [Only RT and Mezo can use this command]')
        .addField('`.suggest <idea>`', 'Suggest ideas to the MelloTunes devs')
        .addField('`.reload <command-name>`', 'Reload a command. [Only RT and Mezo can use this command]')
        .addField('`.report <bug>`', 'Report a bug to the MelloTunes devs')
        .addField('`.restart`', 'Restart the bot. [Only RT and Mezo can use this command.]')
        .addField('`.say <message>`', 'Make the bot say stuff. [People with Admin in a server can use this command in that server they have Admin in.]')
        .setTimestamp()

        const premium = new MessageEmbed()
        .setTitle('Premium [Only Premium People can use these commands]')
        .addField('`.24/7`', 'Keep the bot in vc 24/7')
        .setTimestamp()

        const fun = new MessageEmbed()
        .setTitle('Fun')
        .addField('`.8ball <question>`', 'Ask Mello a question')
        .addField('`.blur <mention>`', 'Blur someones pfp | avatar')
        .addField('`.brightness <mention>`', 'Brighten someones pfp | avatar')
        .addField('`.giveaway <time> <channel> <prize>`', 'Start a giveaway')
        .addField('`.greyscale <mention>`', 'Greyscale someones pfp | avatar')
        .addField('`.invert <mention>`', 'Invert someones pfp | avatar')
        .addField('`.joke`', 'Want some jokes?')
        .addField('`.meme`', 'Want some memes?')
        .addField('`.pixelate <mention>`', 'Pixelate someones pfp | avatar')
        .addField('`.poll <channel> <question>`', 'Create a poll')
        .addField('`.sepia <mention>`', 'Sepia someones pfp | avatar')
        .addField('`.snipe`', 'Show a message that was deleted')
        .addField('`.threshold <mention>`', 'Threshold someones pfp | avatar')
        .setTimestamp()

        const info = new MessageEmbed()
        .setTitle('Info')
        .addField('`.covid <all> | <country> <counry-name> | <continent> <continent-name> | <state> <state-name> | <county> <county-name>`', 'Get the stats of corona')
        .addField('`.invite`', 'Add/Invite the bot to your server')
        .addField('`.serverinfo`', 'Get information on the server')
        .setTimestamp()

        const music = new MessageEmbed()
        .setTitle('Music')
        .addField('`.loop`', 'Toggle music loop')
        .addField('`.lyrics`', 'Get lyrics for the currently playing song')
        .addField('`.np`', 'Show the music which is currently playing in this server')
        .addField('`.pause`', 'Pause the current music in the server')
        .addField('`.play <YouTube_URL> | <song_name>`', 'Play songs')
        .addField('`.playlist <YouTube Playlist URL> | <Playlist Name>`', 'Play songs')
        .addField('`.queue`', 'Show the server songs queue')
        .addField('`.rm <number>`', 'Remove song from the queue')
        .addField('`.resume`', 'Resume the paused music')
        .addField('`.search <song_name>`', 'Search songs')
        .addField('`.shuffle`', 'Shuffle songs in the queue')
        .addField('`.skip`', 'Skip the current song')
        .addField('`.skipto <number>`', 'Skip to the selected queue number')
		.addField('`.stop`', 'Stop the music and clear the queue')
        .addField('`.volume <number>`', 'Change the server song queue volume')
        .setTimestamp()
        const pages = [
            	dev,
                premium,
                fun,
                info,
            	music
        ]

        const emojiList = ['⏪', '⏩'];

        const timeout = '30000';

        pagination(message, pages, emojiList, timeout)    
	}

	module.exports.config = {
    	name: "help",
    	aliases: []
}
