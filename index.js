const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("Bot online"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Webserver running on port ${PORT}`));

const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

const CHANNEL_ID = "IDE ÍRD A CSATORNA ID-T"; // <<--- FONTOS!!!

client.once("ready", () => {
    console.log(`Bot bejelentkezett: ${client.user.tag}`);
});

// ---- TÁMADÁS WEBHOOK ---- //
app.post("/attack", async (req, res) => {
    const { attacker, target } = req.body;

    if (!attacker || !target) {
        return res.status(400).send("Hiányzó adatok: attacker vagy target");
    }

    const time = new Date().toLocaleString("hu-HU");

    const channel = await client.channels.fetch(CHANNEL_ID);
    await channel.send(
        `⚠️ **TÁMADÁS ÉSZLELVE!**\n` +
        `👤 **Támadó:** ${attacker}\n` +
        `🎯 **Célpont:** ${target}\n` +
        `⏰ **Időpont:** ${time}`
    );

    res.send("Értesítés elküldve");
});

client.login(process.env.DISCORD_TOKEN);
