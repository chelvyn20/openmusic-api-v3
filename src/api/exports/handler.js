class ExportsHandler {
  constructor(producerService, playlistsService, validator) {
    this._producerService = producerService;
    this._playlistsService = playlistsService;
    this._validator = validator;

    this.postExportPlaylistsHandler = this.postExportPlaylistsHandler.bind(this);
  }

  async postExportPlaylistsHandler(request, h) {
    this._validator.validateExportPlaylistsPayload(request.payload);

    const { id: credentialId } = request.auth.credentials;
    const { playlistId } = request.params;

    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);

    const message = {
      playlistId: request.params,
      targetEmail: request.payload.targetEmail,
    };

    await this._producerService.sendMessage('export:SongsInPlaylist', JSON.stringify(message));
    const response = h.response({
      status: 'success',
      message: 'Your request is being processed',
    });
    response.code(201);
    return response;
  }
}

module.exports = ExportsHandler;
