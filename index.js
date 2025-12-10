// =========================
//  EXPRESS SERVER
// =========================
const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("Bot online"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Webserver running on port ${PORT}`));


// =========================
//  DISCORD BOT
// =========================
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

// IDE ÍRD A DISCORD CSATORNA ID-JÁT AHOVA KÜLDJE
const CHANNEL_ID = "1448331754359357652";

client.once("ready", () => {
    console.log(`Bot bejelentkezett: ${client.user.tag}`);
});


// =========================
//  /ATTACK VÉGPONT – TAMPERMONKEY IDE KÜLD
// =========================
app.post("/attack", async (req, res) => {
    const { attacker, alliance, target, arrival } = req.body;

    try {
        // megnyitja a csatornát
        const channel = await client.cha

