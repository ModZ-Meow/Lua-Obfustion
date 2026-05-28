const { Client, GatewayIntentBits, AttachmentBuilder } = require("discord.js");
const fs = require("fs");
const { obfuscate } = require("./obf");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on("messageCreate", async (msg) => {

    if (msg.author.bot) return;

    if (!msg.content.startsWith("/obf")) return;

    let code = msg.content.slice(4).trim();

    if (!code) {
        return msg.reply("Paste code");
    }

    let loading = await msg.reply("please wait...");

    let result = obfuscate(code);

    let file = "./obf.lua";
    fs.writeFileSync(file, result);

    let attachment = new AttachmentBuilder(file);

    await msg.reply({
        content: `<@${msg.author.id}>`,
        files: [attachment]
    });

    loading.delete().catch(()=>{});
});

client.login("MTUwOTUwNjEyODUwNDE2MDMzNw.G1XcfK.pE29mWmy3mrUxVW4TDMSauBfSuk3qnnbAYWpZ0");
client.on("messageCreate", msg => {
    console.log(">>>", msg.content);
});
client.on("messageCreate", msg => {
    console.log("MSG:", msg.content);
});
