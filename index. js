const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Bot online"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Webserver running on port ${PORT}`));

const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once("ready", () => {
    console.log(`Bot bejelentkezett: ${client.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);
