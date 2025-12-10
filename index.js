const express = require("express");
const app = express();
app.use(express.json()); // fontos, hogy tudja olvasni a JSON body-t

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

// Bot ready esemény
client.on("clientReady", () => {
    console.log(`Bot bejelentkezett: ${client.user.tag}`);
});

// Teszt: Discord üzenetek figyelése
client.on("messageCreate", message => {
    if(message.author.bot) return;

    if(message.content.toLowerCase().includes("támadás")) {
        message.channel.send("⚠️ Figyelem! Támadás történt!");
    }
});

// Új webhook végpont külső eseményekhez
// Pl. a játék szerver POST-ol ide, ha támadás történik
app.post("/attack", (req, res) => {
    // DISCORD_CHANNEL_ID helyére írd be a csatorna ID-ját
    const channel = client.channels.cache.get("DISCORD_CHANNEL_ID");
    if(channel) {
        const attacker = req.body.attacker || "Ismeretlen";
        const target = req.body.target || "Ismeretlen";
        channel.send(`⚠️ Figyelem! Támadás történt!\nTámadó: ${attacker}\nCélpont: ${target}`);
    }
    res.sendStatus(200); // válasz a POST kérésre
});

client.login(process.env.DISCORD_TOKEN);
