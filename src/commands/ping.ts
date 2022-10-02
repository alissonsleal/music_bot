const { SlashCommandBuilder } = require('@discordjs/builders')

export const ping = {
  data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
  async execute(interaction: any) {
    await interaction.reply('Pong!')
  },
}
