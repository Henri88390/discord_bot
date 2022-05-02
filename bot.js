const config = require('config');
const bot_token = config.get('discord.bot_token');
const tenor_key = config.get('tenor.key');
const tenor_api_search_url = config.get('tenor.api.search');
const { Client, Intents } = require('discord.js');
const Discord = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
client.on('message', async (msg) => {
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }

    const tokens = msg.content.split(" ");
    console.log(tokens)
    if (tokens[0] === "!gif") {
        console.log("oui")
        const keywords = tokens.slice(1, tokens.length).join(" ");

        const url = `${tenor_api_search_url}${keywords}&key=${tenor_key}&limit=10`
        console.log(url)
        await fetch(url).then((response) => {
            response.json().then((result) => {
                let index = Math.floor(Math.random() * result.results.length);
                msg.channel.send(result.results[index].url)
            })
        })
        // const result = await response.json()
        // const index = Math.floor(Math.random() * result.results.length);
        // msg.channel.send(result.results[index].url)
    }
});
client.login(bot_token);