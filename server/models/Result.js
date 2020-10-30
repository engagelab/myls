/*
 Designed and developed by Richard Nesnass
 */

const mongoose = require('mongoose')

const itemSchema = {
  title: { type: String },
  group: { type: String },
  info: { type: String },
  name: { type: String },
  url: { type: String },
  search: { type: String },
  selections: { type: Object },
  historyItems: [
    {
      id: { type: String },
      lastVisitTime: { type: Number },
      // title: { type: String },
      typedCount: { type: Number },
      // url: { type: String },
      visitCount: { type: Number },
      visitItems: [
        {
          id: { type: String },
          referringVisitId: { type: String },
          transition: { type: String },
          visitId: { type: String },
          visitTime: { type: Number }
        }
      ]
    }
  ]
}

const practicesSchema = {
  practice: { type: String },
  actions: { type: Array, default: [], of: { type: String } }
}

const resultSchema = new mongoose.Schema(
  {
    installId: { type: String },
    consentEmail: { type: String },
    consented: { type: Boolean },
    lottery: { type: Boolean },
    created: { type: Date, default: Date.now },
    demographics: {
      type: Array,
      default: [],
      of: {
        title: { type: String },
        selection: { type: mongoose.Schema.Types.Mixed }
      }
    },
    practices: {
      type: Array,
      default: [],
      of: practicesSchema
    },
    items: {
      type: Array,
      default: [],
      of: itemSchema
    }
  },
  { usePushEach: true }
)

// Duplicate the ID field.
// eslint-disable-next-line
resultSchema.virtual("id").get(function() {
  // eslint-disable-next-line
  return this._id.toString();
})

// Ensure virtual fields are serialised.
resultSchema.set('toJSON', {
  getters: true,
  virtuals: true
})
resultSchema.set('toObject', {
  getters: true,
  virtuals: true
})

module.exports = mongoose.model('Result', resultSchema)
