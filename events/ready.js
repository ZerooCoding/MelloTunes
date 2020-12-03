module.exports = async (client) => {
    console.log(`[API] Logged in as ${client.user.username}`);
client.channels.cache.find(channel => channel.id === 'channel-id').send('MelloTunes is online!') //This is incase you want it to say if it is online, You can remove this line if you don't want it, If you do, Then just edit the 'channel-id', And edit the 'MelloTunes is online!' is you want it to say something else.
    await client.user.setActivity(".help", { //change .help for whatever you want it to say after the listening or other part
        type: "LISTENING", //can be LISTENING, WATCHING, PLAYING, STREAMING
    });
};
