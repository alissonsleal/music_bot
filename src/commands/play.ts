import { SlashCommandBuilder } from '@discordjs/builders'
import { EmbedBuilder, Interaction } from 'discord.js'
import { QueryType } from 'discord-player'

export const play = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play a song from YouTube.')
    .addStringOption((option) =>
      option.setName('query').setDescription('The song you want to play (url or search query)').setRequired(true),
    ),

  execute: async (interaction: Interaction) => {
    if (!interaction.isCommand()) return

    // Make sure the user is inside a voice channel
    // @ts-ignore
    if (!interaction.member.voice.channelId) {
      return interaction.reply({
        content: 'You need to be in a voice channel to execute this command!',
        ephemeral: true,
      })
    }

    // Create a play queue for the server
    // @ts-ignore
    const queue = interaction.client.player.createQueue(interaction.guildId, {
      leaveOnEmpty: true,
      leaveOnEnd: true,
      leaveOnStop: true,
      metadata: {
        channel: interaction.channel,
      },
    })

    // Wait until you are connected to the channel
    try {
      if (!queue.connection) {
        // @ts-ignore
        await queue.connect(interaction.member.voice.channelId)
      }
    } catch {
      queue.destroy()
      return interaction.reply({
        content: 'Could not join your voice channel!',
        ephemeral: true,
      })
    }

    // Search for the song using the discord-player
    // @ts-ignore
    const search = interaction.options.getString('query')
    // @ts-ignore
    let songs = await interaction.client.player
      .search(search, {
        requestedBy: interaction.user,
        searchEngine: QueryType.AUTO,
      })
      .then((x) => x.tracks.map((track) => track))

    // If there is no song, return an error message
    if (!songs.length) {
      return interaction.reply({
        content: 'No songs were found!',
        ephemeral: true,
      })
    }

    // Add the songs to the queue
    // @ts-ignore
    queue.addTracks(songs)

    // Play the songs
    const success = queue.play()

    // Finish if there was no success
    if (!success) {
      return interaction.reply({
        content: 'There was an error while starting the track!',
        ephemeral: true,
      })
    }

    // Play the song
    const playing = queue.play()

    // Finish if there was no success
    if (!playing) {
      return interaction.reply({
        content: 'There was an error while starting the track!',
        ephemeral: true,
      })
    }

    // Create an embed
    const embed = new EmbedBuilder()
      .setTitle('Now playing')
      .setDescription(`[${songs[0].title}](${songs[0].url})`)
      .setThumbnail(songs[0].thumbnail)
      .setColor('#9e59ee')
      .setTimestamp()

    // Send the embed
    return interaction.reply({
      embeds: [embed],
    })
  },
}
