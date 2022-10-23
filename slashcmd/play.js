const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("music test")
        .addStringOption((option) => {
            return option
                .setName("string")
                .setDescription("name of a song")
                .setRequired(true)
        }),
    async run(fur, interaction) {

        let vcUser = interaction.member.voice.channel
        let nameSong = interaction.options.getString("string")
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
            .setAuthor({ name: "💿 | Buscando cancion... " })
            .setColor("BLURPLE")

        if (!vcUser) return interaction.reply({ embeds: [errorUservc] })

        if (vcBot) {
            if (vcBot.id !== vcUser.id) return interaction.reply({ embeds: [errorSameVc] })
        } else { }

        if (guildQueue) {

            await interaction.reply({ embeds: [findSong] })

            await queue.join(vcUser);

            let song = await queue.play(nameSong).catch(err => {
                console.log(err);
                if (!guildQueue)
                    queue.stop();
            })

            const embed = new Discord.MessageEmbed()
                .setAuthor({ name: "🎶 | Cancion añadida" })
                .setDescription(`[${song.name}](${song.url})\n` + "``" + `[${song.duration}]` + "``")
                .setThumbnail(song.thumbnail)
                .setColor("GREEN")
                .setFooter({ text: `Pedida por: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
                .setTimestamp()

            await interaction.editReply({ embeds: [embed] })

        } else if (!guildQueue) {

            await interaction.reply({ embeds: [findSong] })

            await queue.join(vcUser);

            let song = await queue.play(nameSong).catch(err => {
                console.log(err);
                if (!guildQueue)
                    queue.stop();
            })

            const embed = new Discord.MessageEmbed()
                .setAuthor({ name: "🎶 | Cancion sonando " })
                .setDescription(`[${song.name}](${song.url})\n` + "``" + `[${song.duration}]` + "``")
                .setThumbnail(song.thumbnail)
                .setColor("GREEN")
                .setFooter({ text: `Pedida por: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
                .setTimestamp()

            await interaction.editReply({ embeds: [embed] })

        }

    }
}