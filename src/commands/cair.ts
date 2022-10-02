import { QueryType } from 'discord-player'

const { SlashCommandBuilder } = require('@discordjs/builders')

export const cair = {
  data: new SlashCommandBuilder().setName('cair').setDescription('Pra quando você quer sair da call'),
  async execute(interaction: any) {
    // @ts-ignore
    let queue
    queue = interaction.client.player.getQueue(interaction.guildId)

    if (!queue || !queue.playing) {
      queue = interaction.client.player.createQueue(interaction.guildId, {
        leaveOnEmpty: true,
        leaveOnEnd: true,
        leaveOnStop: true,
        metadata: {
          channel: interaction.channel,
        },
      })
    }

    // @ts-ignore
    const voiceChannel = interaction.member.voice.channel

    // check if the member is in a voice channel
    if (!voiceChannel) {
      return interaction.reply({
        content: 'Você precisa estar em um canal de voz para executar este comando!',
        ephemeral: true,
      })
    }

    try {
      if (!queue.connection) {
        // @ts-ignore
        await queue.connect(voiceChannel.id)
      }
    } catch {
      queue.destroy()
      return interaction.reply({
        content: 'Não foi possível entrar no seu canal de voz!',
        ephemeral: true,
      })
    }

    const cairUrl = 'https://www.youtube.com/watch?v=ihJp_tWnvQc'

    // @ts-ignore
    const song = await interaction.client.player
      .search(cairUrl, {
        requestedBy: interaction.user,
        searchEngine: QueryType.AUTO,
      })
      .then((x) => x.tracks[0])

    queue.addTrack(song)

    if (!queue.playing) {
      queue.play()
    }

    return interaction.reply({
      content: `Rápido, ${interaction.user} saia da sala quando o bot cair!`,
    })
  },
}
