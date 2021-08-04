const Joi = require('joi');

const SongsInPlaylistPayloadSchema = Joi.object({
  songId: Joi.string().required(),
});

module.exports = SongsInPlaylistPayloadSchema;
