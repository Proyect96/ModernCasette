const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
const { RepeatMode } = require('discord-music-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("nowplaying")
        .setDescription("music test"),
    async run(fur, interaction) {

        let vcUser = interaction.member.voice.channel
        let queue = await fur.player.getQueue(interaction.guild.id);
        let vcBot = interaction.guild.members.cache.get(fur.user.id).voice.channel
        const ProgressBar = queue.createProgressBar();

        let embed1 = new Discord.MessageEmbed()
            .setAuthor({ name: "❌ | No estas en un canal de voz" })
            .setColor("RED")

        let embed2 = new Discord.MessageEmbed()
            .setAuthor({ name: "❌  | No estas en el mismo canal de voz que yo" })
            .setColor("RED")

        let embed3 = new Discord.MessageEmbed()
            .setAuthor({ name: "❌ | No hay ninguna cancion en fila" })
            .setColor("RED")

        if (!vcUser) return interaction.reply({ embeds: [embed1] })
        if (vcBot) {
            if (vcBot.id !== vcUser.id) return interaction.reply({ embeds: [embed2] })
        }
        if (!queue) return interaction.reply({ embeds: [embed3] })

        let song = queue.nowPlaying

        let embed4 = new Discord.MessageEmbed()
            .setAuthor({ name: "💿 | Sonando ahora" })
            .setDescription(`[${song.name}](${song.url})\n\n`+"``"+ProgressBar.toString()+"``")
            .setColor("BLURPLE")
            .setThumbnail(song.thumbnail)
            .setTimestamp()

        interaction.reply({ embeds: [embed4] })

    }
}