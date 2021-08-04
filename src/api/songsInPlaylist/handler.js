/* eslint-disable max-len */
class SongsInPlaylistHandler {
  constructor(songsInPlaylistService, playlistsService, validator) {
    this._songsInPlaylistService = songsInPlaylistService;
    this._playlistsService = playlistsService;
    this._validator = validator;

    this.postSongToPlaylistHandler = this.postSongToPlaylistHandler.bind(this);
    this.getSongsInPlaylistHandler = this.getSongsInPlaylistHandler.bind(this);
    this.deleteSongFromPlaylistHandler = this.deleteSongFromPlaylistHandler.bind(this);
  }

  async postSongToPlaylistHandler(request, h) {
    this._validator.validateSongsInPlaylistPayload(request.payload);

    const { id: credentialId } = request.auth.credentials;
    const { songId } = request.payload;
    const { playlistId } = request.params;

    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    const songInPlaylistId = await this._songsInPlaylistService.addSongToPlaylist(songId, playlistId);

    const response = h.response({
      status: 'success',
      message: 'Successfully added the song in the playlist',
      data: {
        songInPlaylistId,
      },
    });
    response.code(201);
    return response;
  }

  async getSongsInPlaylistHandler(request) {
    const { id: credentialId } = request.auth.credentials;
    const { playlistId } = request.params;

    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    const songs = await this._songsInPlaylistService.getSongsInPlaylist(playlistId);

    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  async deleteSongFromPlaylistHandler(request) {
    this._validator.validateSongsInPlaylistPayload(request.payload);

    const { id: credentialId } = request.auth.credentials;
    const { songId } = request.payload;
    const { playlistId } = request.params;

    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    await this._songsInPlaylistService.deleteSongFromPlaylist(songId, playlistId);

    return {
      status: 'success',
      message: 'successfully deleted the song from the playlist',
    };
  }
}

module.exports = SongsInPlaylistHandler;
