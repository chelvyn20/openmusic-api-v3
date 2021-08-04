const Joi = require('joi');

const currentYear = parseInt(new Date().getFullYear(), 10);
const SongPayloadSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().integer().min(1900).max(currentYear).required(),
  performer: Joi.string().required(),
  genre: Joi.string(),
  duration: Joi.number(),
});

module.exports = SongPayloadSchema;
