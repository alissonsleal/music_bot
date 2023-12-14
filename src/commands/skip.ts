import { EmbedBuilder } from 'discord.js'
import { usePlayer } from 'discord-player'
import { Interaction } from 'discord.js'

const { SlashCommandBuilder } = require('@discordjs/builders')

export const skip = {
  data: new SlashCommandBuilder().setName('skip').setDescription('Skip the current song'),
  async execute(interaction: Interaction) {
    const player = usePlayer(interaction.guildId)

    if (!player) {
      return interaction.isRepliable() && interaction.reply('No player found!')
    }

    if (!player.queue.currentTrack) {
      return interaction.isRepliable() && interaction.reply('No track is currently playing!')
    }

    const { currentTrack } = player.queue || {}

    player.queue.node.skip()

    return (
      interaction.isRepliable() &&
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle('Skipped')
            .setDescription(`[${currentTrack.title}](${currentTrack.url})`)
            .setColor('#9e59ee')
            .setThumbnail(currentTrack.thumbnail)
            .setFooter({
              text: `Requested by ${interaction.user.username}`,
            })
            .setTimestamp(),
        ],
      })
    )
  },
}
