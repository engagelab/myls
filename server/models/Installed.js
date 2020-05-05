/*
 Designed and developed by Richard Nesnass
 */

const mongoose = require('mongoose')

const installedSchema = new mongoose.Schema({
  installId: { type: String },
  installed: { type: Date },
  uninstalled: { type: Date }
})

// Duplicate the ID field.
// eslint-disable-next-line
installedSchema.virtual("id").get(function() {
  // eslint-disable-next-line
  return this._id.toString();
})

// Ensure virtual fields are serialised.
installedSchema.set('toJSON', {
  getters: true,
  virtuals: true
})
installedSchema.set('toObject', {
  getters: true,
  virtuals: true
})

module.exports = mongoose.model('Installed', installedSchema)
