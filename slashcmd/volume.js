const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("volume")
        .setDescription("music test")
        .addStringOption((option) => {
            return option
                .setName("string")
                .setDescription("volumen")
                .setRequired(true)
        })
    ,
    async run(fur, interaction) {

        let vcUser = interaction.member.voice.channel
        let queue = await fur.player.getQueue(interaction.guild.id);
        let vcBot = interaction.guild.members.cache.get(fur.user.id).voice.channel
        let vol = interaction.options.getString("string")

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
            .setAuthor({ name: "❌ | El volumen debe estar entre 0 a 200 " })
            .setColor("RED")

            let embed5 = new Discord.MessageEmbed()
            .setAuthor({name: "💿 | Volumen establecido en "+vol+"%"})
            .setColor("GREEN")


        if (!vcUser) return interaction.reply({ embed1 })
        if (vcBot) {
            if (vcBot.id !== vcUser.id) return interaction.reply({ embeds: [embed2] })
        }
        if (!queue) return interaction.reply({ embeds: [embed3] })

        if (vol) {

            if (vol < 0 || vol > 200) return interaction.reply({ embeds: [embed4] })

            queue.setVolume(vol)

            interaction.reply({ embeds: [embed5] })

        }

    }
}