const { SlashCommandBuilder } = require('@discordjs/builders')
import { EmbedBuilder, Interaction } from 'discord.js'

export const clear = {
  data: new SlashCommandBuilder().setName('clear').setDescription('Clears the whole chat history.'),
  async execute(interaction: Interaction) {
    if (!interaction.isCommand()) return

    const success = await interaction.channel.bulkDelete(100)

    const successEmbed = new EmbedBuilder()
      .setTitle('Cleared chat')
      .setDescription('Cleared the chat history.')
      .setColor('#9e59ee')

    const errorEmbed = new EmbedBuilder()
      .setTitle('Error')
      .setDescription('Could not clear the chat history.')
      .setColor('#f33e3e')

    return interaction.reply({
      embeds: success ? [successEmbed] : [errorEmbed],
    })
  },
}
