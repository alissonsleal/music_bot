const { SlashCommandBuilder } = require('@discordjs/builders')
import { EmbedBuilder, Interaction } from 'discord.js'

export const resume = {
  data: new SlashCommandBuilder().setName('resume').setDescription('Resume the current playing song.'),
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

    const success = queue.setPaused(false)

    const currentTrack = queue.current

    const successEmbed = new EmbedBuilder()
      .setTitle('Resumed song')
      .setDescription(`[${currentTrack.title}](${currentTrack.url})`)
      .setThumbnail(currentTrack.thumbnail)
      .setColor('#9e59ee')

    const errorEmbed = new EmbedBuilder()
      .setTitle('Error')
      .setDescription('Could not resume the song.')
      .setColor('#f33e3e')

    return interaction.reply({
      embeds: success ? [successEmbed] : [errorEmbed],
    })
  },
}
