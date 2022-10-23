const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("playlist")
        .setDescription("music test")
        .addStringOption((option) => {
            return option
                .setName("string")
                .setDescription("link of playlist")
                .setRequired(true)
        }),
    async run(fur, interaction) {

        let vcUser = interaction.member.voice.channel
        let playlist = interaction.options.getString("string")
        let guildQueue = await fur.player.getQueue(interaction.guild.id);
        let queue = await fur.player.createQueue(interaction.guild.id);
        let vcBot = interaction.guild.members.cache.get(fur.user.id).voice.channel

        const errorUservc = new Discord.MessageEmbed()
            .setAuthor({ name: "❌ | No estas en un canal de voz" })
            .setColor("RED")

        const errorSameVc = new Discord.MessageEmbed()
            .setAuthor({ name: "❌ | No estas en el mismo canal de voz que yo " })
            .setColor("RED")

        const findSong = new Discord.MessageEmbed()
            .setAuthor({ name: "💿 | Buscando playlist... " })
            .setColor("BLURPLE")

        const errorPlay = new Discord.MessageEmbed()
            .setAuthor({ name: "❌ | Ese no es un link de playlist valido" })
            .setColor("RED")

        if (!vcUser) return interaction.reply({ embeds: [errorUservc] })
        if (vcBot) {
            if (!vcBot.id == vcUser.id) return interaction.reply({ embeds: [errorSameVc] })
        }
        if (playlist) {
            if (!playlist.startsWith("https://")) return interaction.reply({ embeds: [errorPlay] })
        }

        if (guildQueue) {

            await interaction.reply({ embeds: [findSong] })

            await queue.join(vcUser)

            let song = await queue.playlist(playlist).catch(err => {
                console.log(err);
                if (!guildQueue)
                    queue.stop();
            })

            const playListo = new Discord.MessageEmbed()
                .setAuthor({ name: "🎶 | Playlist añadida" })
                .setDescription(`[${song.name}](${song.url})\n` + "``" + `Canciones: [${song.songs.length}]` + "``")
                .setThumbnail("https://www.pngkey.com/png/full/612-6122828_radio-cassette-boombox-radio-radiocassette-cassette-tape.png")
                .setColor("GREEN")
                .setFooter({ text: `Pedida por: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
                .setTimestamp()

            await interaction.editReply({ embeds: [playListo] })

        } else if (!guildQueue) {

            await interaction.reply({ embeds: [findSong] })

            await queue.join(vcUser)

            let song = await queue.playlist(playlist).catch(err => {
                console.log(err);
                if (!guildQueue)
                    queue.stop();
            })

            const playListo = new Discord.MessageEmbed()
                .setAuthor({ name: "🎶 | Playlist Sonando" })
                .setDescription(`[${song.name}](${song.url})\n` + "``" + `Canciones: [${song.songs.length}]` + "``")
                .setThumbnail("https://www.pngkey.com/png/full/612-6122828_radio-cassette-boombox-radio-radiocassette-cassette-tape.png")
                .setColor("GREEN")
                .setFooter({ text: `Pedida por: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
                .setTimestamp()

            await interaction.editReply({ embeds: [playListo] })

        }

    }
}