import { SlashCommandBuilder } from '@discordjs/builders'
import { EmbedBuilder } from 'discord.js'
import { Player, QueryType } from 'discord-player'

export const play = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play a song from YouTube.')
    .addStringOption((option) =>
      option.setName('query').setDescription('The song you want to play (url or search query)').setRequired(true),
    ),

  execute: async (interaction, client) => {
    const player = new Player(client)

    const channel = interaction.member.voice.channel
    if (!channel) return interaction.reply('You are not connected to a voice channel!')
    const query = interaction.options.getString('query', true)
    await interaction.deferReply()

    try {
      const { track } = await player.play(channel, query, {
        nodeOptions: {
          leaveOnEmpty: true,
          leaveOnEnd: true,
          metadata: interaction,
        },
        searchEngine: QueryType.AUTO,
      })

      console.log({ track })

      console.log({ interaction })

      return interaction.followUp({
        embeds: [
          new EmbedBuilder()
            .setTitle('Now playing')
            .setDescription(`[${track.title}](${track.url})`)
            .setColor('#9e59ee')
            .setThumbnail(track.thumbnail)
            .setFooter({
              text: `Requested by ${interaction.user.username}`,
            })
            .setTimestamp(),
        ],
      })
    } catch (e) {
      return interaction.followUp(`Something went wrong: ${e}`)
    }
  },
}
