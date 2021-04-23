
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saleSchema = new Schema({
    items: [{
      type: Schema.ObjectId,
      ref: 'saleItem',
    }],
    tempId: {type: String},
    order: {type: Boolean},
    outlet: {
      type: Schema.ObjectId,
      ref: 'outlet',
    },
    visit: {
      type: Schema.ObjectId,
      ref: 'visit',
    },
    user: {
      type: Schema.ObjectId,
      ref: 'user',
    },
    project: {
      type: Schema.ObjectId,
      ref: 'project',
    },
    date: {type: Date, required: true, default: Date()}
});

module.exports = mongoose.model('sale', saleSchema, 'sales');
