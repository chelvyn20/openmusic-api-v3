const InvariantError = require('../../exceptions/InvariantError');
const SongsInPlaylistPayloadSchema = require('./schema');

const SongsInPlaylistValidator = {
  validateSongsInPlaylistPayload: (payload) => {
    const validationResult = SongsInPlaylistPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = SongsInPlaylistValidator;
