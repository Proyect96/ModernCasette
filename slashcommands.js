const fs = require('fs')
const Discord = require('discord.js')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const { clientId, token } = require('./config_bot/config.json')
const commands = []
const slashcommandsFiles = fs.readdirSync("./slashcmd").filter(file => file.endsWith('.js'))
for (const file of slashcommandsFiles) {
    const slash = require(`./slashcmd/${file}`)
    commands.push(slash.data. toJSON())
}

const rest = new REST({ version: "9" }).setToken(token)

createSlash()

async function createSlash(){
    try{
        await rest.put(
            Routes.applicationCommands(clientId), {
                body: commands
            }
        )
        console.log('SlashCommands Agregados')
    }catch (e){
        console.error(e)
    }
}