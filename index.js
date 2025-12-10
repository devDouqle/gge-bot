const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Bot online"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Webserver running on port ${PORT}`));

const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ] 
});

// ready esemény
client.on("clientReady", () => {
    console.log(`Bot bejelentkezett: ${client.user.tag}`);
});

// példa: figyelés üzenetekre
client.on("messageCreate", message => {
    // bot saját üzenetét ne figyeljük
    if(message.author.bot) return;

    // példa figyelés: ha valaki írja, hogy "támadás"
    if(message.content.toLowerCase().includes("támadás")) {
        message.channel.send("⚠️ Figyelem! Támadás történt!");
    }
});

client.login(process.env.DISCORD_TOKEN);
