# music_bot

A bot that plays music in discord voice channels since Mantaro and Groovy are dead.

The name is still pending and you can't invite it yet, but you can run it yourself if you want to.

## Running

Create a file called `.env` and put the same envs from `.env.example` in it.

```env
TOKEN=
CLIENT_ID=
```

### With Docker

```sh
docker build -t music_bot .
docker run -d --name music_bot music_bot
```

### Without Docker

```sh
# with npm
npm install
npm run build
npm start

# with yarn
yarn
yarn build
yarn start
```

## Commands

- [x] `/play` - Plays a song from youtube

- [x] `/skip` - Skips the current song

- [x] `/stop` - Stops the music

- [x] `/queue` - Shows the current queue

- [] `/nowplaying` - Shows the current song

- [] `/pause` - Pauses the music

- [] `/resume` - Resumes the music

- [] `/volume` - Changes the volume

- [] `/loop` - Loops the current song

- [] `/shuffle` - Shuffles the queue

- [] `/remove` - Removes a song from the queue

- [] `/seek` - Seeks to a specific time in the current song

- [] `/lyrics` - Shows the lyrics of the current song

- [] `/search` - Searches for a song on youtube

- [] `/playlists` - Shows the current playlists

- [] `/playlist` - Shows a playlist

- [] `/createplaylist` - Creates a playlist

- [] `/deleteplaylist` - Deletes a playlist

- [] `/help` - Shows the help menu

## Contributing

If you want to contribute, you can open a pull request. If you want to add a feature, please open an issue first so we can discuss it.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Tech Stack

- [Node.js](https://nodejs.org/en/)
- [Discord.js](https://discord.js.org/#/)
- [ytdl-core](https://www.npmjs.com/package/ytdl-core)
- [Typescript](https://www.typescriptlang.org/)
- [Docker](https://www.docker.com/)
