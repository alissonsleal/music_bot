require('dotenv').config()

import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { Client, Collection, GatewayIntentBits } from 'discord.js'
import { Player } from 'discord-player'
import { environment } from './environment'

import fs from 'fs'
import path from 'path'

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates],
}) as Client & { player: Player; commands: Collection<string, any> }

const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath)

const commands = [] as any
client.commands = new Collection()

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file))
  const commandName = file.split('.')[0]

  client.commands.set(commandName, command)
  commands.push(command[commandName].data.toJSON())
}

const rest = new REST({ version: '9' }).setToken(environment.token)

const player = new Player(client, {
  ytdlOptions: {
    quality: 'highestaudio',
    highWaterMark: 1 << 25,
  },
})

client.player = player

client.on('ready', async () => {
  console.log('ready')

  try {
    console.log('Started refreshing application (/) commands.')

    const guildIds = client.guilds.cache.map((guild) => guild.id)

    const body = commands.map((command: any) => {
      return {
        ...command,
        default_permission: false,
      }
    })

    guildIds.forEach(async (guildId) => {
      await rest.put(Routes.applicationGuildCommands(environment.clientId, guildId), {
        body,
      })
    })

    console.log('Successfully reloaded application (/) commands.')
  } catch (error) {
    console.error(error)
  }
})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return

  const { commandName } = interaction

  const command = client.commands.get(commandName)

  if (!command) return

  try {
    await command[commandName].execute(interaction)
  } catch (error) {
    console.error(error)
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
  }
})

// start the bot
client.login(environment.token)
