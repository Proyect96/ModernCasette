const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
const { truncate } = require('fs')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("dm")
        .setDescription("manda un msg privado a un usuario")
        .addUserOption((option) => {
            return option 
            .setName("user")
            .setDescription("Elige a un usuario para mandarle el msg")
            .setRequired(true)
        })
        .addStringOption((option) => {
            return option 
            .setName("string")
            .setDescription("Escribe el msg")
            .setRequired(true)
        })
        ,
    async run(fur, interaction) {

        let string = interaction.options.getString("string")
        let user = interaction.options.getUser("user")

        const e = new Discord.MessageEmbed()
        .setTitle("Nuevo Mensaje")
        .setDescription(`${string}`)

        let chUser = await fur.users.cache.get(user.id)

        interaction.reply({content: "Mensaje Enviado!", ephemeral: true})

        chUser.send({embeds: [e]}).catch((e) => {
            console.log(`Este usuario no tiene los msg directos activados, `+e)
        })

    }   
}