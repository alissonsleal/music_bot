import { QueueRepeatMode } from 'discord-player'
import { EmbedBuilder, Interaction, SlashCommandBuilder } from 'discord.js'

export const loop = {
  data: new SlashCommandBuilder().setName('loop').setDescription('Loop the current playlist or song.'),
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

    /**
     * @description
     * The mode of the queue, returns QueueRepeatMode.QUEUE if there's multiple
     * songs in the queue, QueueRepeatMode.TRACK if there's only one song in the
     * queue, QueueRepeatMode.OFF if the queue is on repeat
     */
    const getRepeatMode = (mode: QueueRepeatMode) => {
      if ([QueueRepeatMode.QUEUE, QueueRepeatMode.TRACK].includes(mode)) {
        return QueueRepeatMode.OFF
      }

      if (queue.tracks.length === 1) {
        return QueueRepeatMode.TRACK
      }

      return QueueRepeatMode.QUEUE
    }

    const repeatMode = getRepeatMode(queue.repeatMode)

    const success = queue.setRepeatMode(repeatMode)
    const mode = queue.repeatMode ? 'Repeat mode **enabled**!' : 'Repeat mode **disabled**!'

    const embed = new EmbedBuilder().setTitle('Loop').setDescription(mode).setColor('#9e59ee')
    const errorEmbed = new EmbedBuilder()
      .setTitle('Error')
      .setDescription('Could not loop the song.')
      .setColor('#f33e3e')

    return interaction.reply({
      embeds: success ? [embed] : [errorEmbed],
    })
  },
}
