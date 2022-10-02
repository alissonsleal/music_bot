import { Interaction } from 'discord.js'

const { SlashCommandBuilder } = require('@discordjs/builders')

export const skip = {
  data: new SlashCommandBuilder().setName('skip').setDescription('Skip the current song'),
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

    const success = queue.skip()

    return interaction.reply({
      content: success ? 'Skipped the song!' : 'Something went wrong!',
      ephemeral: true,
    })
  },
}
