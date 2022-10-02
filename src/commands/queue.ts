import { EmbedBuilder, Interaction, SlashCommandBuilder } from 'discord.js'

export const queue = {
  data: new SlashCommandBuilder().setName('queue').setDescription('Show the music queue and now playing.'),
  async execute(interaction: Interaction) {
    if (!interaction.isCommand()) return

    // @ts-ignore
    const queue = interaction.client.player.getQueue(interaction.guildId)

    if (!queue || !queue.playing) {
      return interaction.reply({
        content: 'No music is being played!',
        ephemeral: true,
      })
    }

    const currentTrack = queue.current
    const tracks = queue.tracks

    console.log({ currentTrack })

    const embed = new EmbedBuilder().setTitle('Playlist Queue').setDescription(
      `**Now Playing** ${currentTrack.title} - ${currentTrack.requestedBy}\n\n` +
        tracks
          .map((track, i) => {
            return `🔊 ${i + 1}. ${track.title}`
          })
          .join('\n'),
    )

    return interaction.reply({
      embeds: [embed],
      ephemeral: true,
    })
  },
}
