const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("music test"),
    async run(fur, interaction) {

        let vcUser = interaction.member.voice.channel
        let hasQueue = await fur.player.hasQueue(interaction.guild.id);
        let vcBot = interaction.guild.members.cache.get(fur.user.id).voice.channel

        let embed1 = new Discord.MessageEmbed()
            .setAuthor({ name: "❌ | No estas en un canal de voz" })
            .setColor("RED")

        let embed2 = new Discord.MessageEmbed()
            .setAuthor({ name: "❌  | No estas en el mismo canal de voz que yo" })
            .setColor("RED")

        let embed3 = new Discord.MessageEmbed()
            .setAuthor({ name: "❌ | No hay ninguna cancion en fila" })
            .setColor("RED")

        let embed4 = new Discord.MessageEmbed()
            .setAuthor({ name: "💿 | Cancion resumida" })
            .setColor("GREEN")

        let embed5 = new Discord.MessageEmbed()
            .setAuthor({ name: "💿  | Cancion pausada" })
            .setColor("RED")

        if (!vcUser) return interaction.reply({ embeds: [embed1] })

        if (vcBot) {
            if (vcBot.id !== vcUser.id) return interaction.reply({ embeds: [embed2] })
        }

        if (!hasQueue) return interaction.reply({ embeds: [embed3] })

        let queue = await fur.player.getQueue(interaction.guild.id)

        if (queue.paused) {

            queue.setPaused(false)
            return interaction.reply({ embeds: [embed4] })

        } else {

            queue.setPaused(true)
            return interaction.reply({ embeds: [embed5] })
        }

    }
}