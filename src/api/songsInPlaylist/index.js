const SongsInPlaylistHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'songsInPlaylist',
  version: '1.0.0',
  register: async (server, { songsInPlaylistService, playlistsService, validator }) => {
    const songsInPlaylistHandler = new SongsInPlaylistHandler(
      songsInPlaylistService, playlistsService, validator,
    );

    server.route(routes(songsInPlaylistHandler));
  },
};
