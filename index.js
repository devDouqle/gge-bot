const express = require("express");
const app = express();
app.use(express.json());// CORS engedélyezés
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});


app.get("/", (req, res) => res.send("Bot online"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Webserver running on port ${PORT}`));

const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

const CHANNEL_ID = "1448331754359357652";

client.once("ready", () => {
    console.log(`Bot bejelentkezett: ${client.user.tag}`);
});

app.post("/attack", async (req, res) => {
    const { attacker, alliance, target, arrival } = req.body;

    if (!attacker || !target) {
        return res.status(400).send("Hiányzó adatok");
    }

    try {
        const channel = await client.channels.fetch(CHANNEL_ID);

        const message = 
`⚠️ **TÁMADÁS ÉSZLELVE!**
👤 **Támadó:** ${attacker}
🏰 **Szövetség:** ${alliance}
🎯 **Célpont:** ${target}
⏰ **Érkezés ideje:** ${arrival}`;

        await channel.send(message);

        res.send("Értesítés elküldve Discordra ✅");
    } catch (e) {
        console.error("[Bot] HIBA a Discord csatorna küldésénél:", e);
        res.status(500).send("Hiba a Discord küldésénél");
    }
});

client.login(process.env.DISCORD_TOKEN);
