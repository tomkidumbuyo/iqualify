const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const outletProductSchema = new Schema({

    tempId: { type: String },
    stock: { type: Number },
    visibility: { type: Boolean },
    user: {
        type: Schema.ObjectId,
        ref: 'user',
        required: false
    },
    outlet: {
      type: Schema.ObjectId,
      ref: 'outlet',
      required: false
    },
    sku: {
        type: Schema.ObjectId,
        ref: 'sku',
        required: false
    },
    project: {
        type: Schema.ObjectId,
        ref: 'project',
        required: false
    },
    visit: {
      type: Schema.ObjectId,
      ref: 'visit',
      required: false
    },
    created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('outletProduct', outletProductSchema, 'outletProducts');