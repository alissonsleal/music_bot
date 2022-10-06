import { EmbedBuilder, Interaction, SlashCommandBuilder } from 'discord.js'

export const nowplaying = {
  data: new SlashCommandBuilder().setName('nowplaying').setDescription('Show the current playing song.'),
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

    const embed = new EmbedBuilder()
      .setTitle('Now Playing')
      .setDescription(`[${currentTrack.title}](${currentTrack.url}) - ${currentTrack.requestedBy}`)
      .setThumbnail(currentTrack.thumbnail)
      .setColor('#9e59ee')
      .setTimestamp()

    return interaction.reply({
      embeds: [embed],
      ephemeral: false,
    })
  },
}
