import { Interaction, SlashCommandBuilder } from 'discord.js'

export const stop = {
  data: new SlashCommandBuilder().setName('stop').setDescription('Stop the music and clear the queue'),
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

    queue.destroy()
    return interaction.reply({
      content: 'Stopped the music!',
      ephemeral: true,
    })
  },
}
