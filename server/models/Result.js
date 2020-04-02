/*
 Designed and developed by Richard Nesnass
 */

const mongoose = require('mongoose');

const itemSchema = { 
  title: { type: String },
  group: { type: String },
  visitData: { 
    count: { type: Number } 
  }
}

const resultSchema = new mongoose.Schema({
  items: {
    type: Array,
    default: [],
    of: itemSchema,
  },
}, { usePushEach: true });

// Duplicate the ID field.
// eslint-disable-next-line
resultSchema.virtual('id').get(function() {
  // eslint-disable-next-line
  return this._id.toString();
});

// Ensure virtual fields are serialised.
resultSchema.set('toJSON', {
  getters: true,
  virtuals: true,
});
resultSchema.set('toObject', {
  getters: true,
  virtuals: true,
});

module.exports = mongoose.model('Result', resultSchema);
