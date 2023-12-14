import { QueryType } from 'discord-player'
import { play } from '~/commands/play'

const { SlashCommandBuilder } = require('@discordjs/builders')

const cairUrl = 'https://www.youtube.com/watch?v=ihJp_tWnvQc'

export const cair = {
  data: new SlashCommandBuilder().setName('cair').setDescription('Pra quando você quer sair da call'),
  async execute(interaction, client) {
    const interactionWithSong = {
      ...interaction,
      options: {
        getString: () => cairUrl,
      },
      deferReply: () => interaction.deferReply(),
    }

    play.execute(interactionWithSong, client)

    return interaction.reply({
      content: `Rápido, ${interaction.user} saia da sala quando o bot cair!`,
      ephemeral: true,
    })
  },
}
