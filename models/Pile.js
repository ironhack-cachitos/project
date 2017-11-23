const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pileSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  elements: [{
    chunk: {
      type: Schema.Types.ObjectId,
      ref: 'Chunk'
    },
    order: {
      type: Number
    }
  }]
});

const Pile = mongoose.model('Pile', pileSchema);
module.exports = Pile;
