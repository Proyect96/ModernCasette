const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
const { RepeatMode } = require('discord-music-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("loop")
        .setDescription("music test")
        .addStringOption((option) => {
            return option
                .setName("option")
                .setDescription("elige el tipo de loop")
                .setChoices(
                    { name: "song", value: "song" },
                    { name: "queue", value: "queue" },
                    { name: "eliminar", value: "disabled" }
                )
                .setRequired(true)
        })
    ,
    async run(fur, interaction) {

        let vcUser = interaction.member.voice.channel
        let hasQueue = await fur.player.getQueue(interaction.guild.id);
        let vcBot = interaction.guild.members.cache.get(fur.user.id).voice.channel
        let option = interaction.options.getString("option")

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
            .setAuthor({ name: "💿 | Bucle activado para la cancion " })
            .setColor("GREEN")

        let embed5 = new Discord.MessageEmbed()
            .setAuthor({ name: "💿 | Bucle activado para la fila " })
            .setColor("GREEN")

        let embed6 = new Discord.MessageEmbed()
            .setAuthor({ name: "💿 | Bucle desactivado" })
            .setColor("GREEN")

        if (!vcUser) return interaction.reply({ embeds: [embed1] })

        if (vcBot) {
            if (!vcBot.id == vcUser.id) return interaction.reply({ embeds: [embed2] })
        }

        if (!hasQueue) return interaction.reply({ embeds: [embed3] })

        if (option) {

            if (option === "song") {
                hasQueue.setRepeatMode(RepeatMode.SONG)
                interaction.reply({ embeds: [embed4] })
            }

            if (option === "queue") {
                hasQueue.setRepeatMode(RepeatMode.QUEUE)
                interaction.reply({ embeds: [embed5] })
            }

            if (option === "disabled") {
                hasQueue.setRepeatMode(RepeatMode.DISABLED)
                interaction.reply({ embeds: [embed6] })
            }
        }
    }
}