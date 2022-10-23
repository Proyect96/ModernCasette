const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
const { DiscordTogether } = require('discord-together');


module.exports = {
    data: new SlashCommandBuilder()
        .setName("cine")
        .setDescription("Discord Together"),
    async run(fur, interaction) {

        fur.discordTogether = new DiscordTogether(fur);

        let vcUser = interaction.member.voice.channel

        let embed1 = new Discord.MessageEmbed()
            .setAuthor({ name: "❌ | No estas en un canal de voz" })
            .setColor("RED")

        let embed3 = new Discord.MessageEmbed()
            .setAuthor({ name: "🎥 | Creando sala" })
            .setColor("BLURPLE")

        if (!vcUser) return interaction.reply({ embeds: [embed1] })
        
        await interaction.reply({ embeds: [embed3] })

        fur.discordTogether.createTogetherCode(vcUser.id, 'youtube').then(async invite => {

            let embed4 = new Discord.MessageEmbed()
                .setAuthor({ name: "🎥 | Cine" })
                .setDescription(`[Click Aqui](${invite.code})`)
                .setColor("GREEN")
                .setTimestamp()

            return await interaction.editReply({embeds: [embed4]});
        })
    }
}