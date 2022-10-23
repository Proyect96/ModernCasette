const Discord = require('discord.js')
const intents = new Discord.Intents()
const client = new Discord.Client({
    partials: ["CHANNEL"], intents: [32767,
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ]
})
const c = require('./config_bot/config.json')

const fs = require('fs')

client.slashcommands = new Discord.Collection();
const slashcommandsFiles = fs.readdirSync('./slashcmd').filter(file => file.endsWith('.js'))

for (const file of slashcommandsFiles) {
    const slash = require(`./slashcmd/${file}`)
    console.log(`Slash - ${file}`)
    client.slashcommands.set(slash.data.name, slash)
}

client.on("ready", () => {
    console.log("Bot Encendido");
})

const { Player } = require("discord-music-player");
const player = new Player(client, {
    leaveOnEmpty: true,
    leaveOnStop: true,
    leaveOnEnd: false,
    deafenOnJoin: true,
    timeout: 30000
});
client.player = player;

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const slashcmds = client.slashcommands.get(interaction.commandName)

    if (!slashcmds) return;

    try {
        await slashcmds.run(client, interaction)
    } catch (e) {
        console.error(e)
    }
})

client.login(c.token)