const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: { type: String, require: true },
  client: {
    type: Schema.ObjectId,
    ref: 'client',
  },
  brands: [{
    type: Schema.ObjectId,
    ref: 'brand',
  }],
  posms: [{
    type: Schema.ObjectId,
    ref: 'posm',
  }],
  giveaways: [{
    type: Schema.ObjectId,
    ref: 'giveaway',
  }],
  regions: [{
    type: Schema.ObjectId,
    ref: 'region',
  }],
  from: { type: Date, require: true },
  to: { type: Date, require: true },
  contactPeople: [{
    name: { type: String, require: true },
    position: { type: String, require: true },
    email: { type: String, require: true },
    phone: { type: String, require: true },
  }],
  products: [{
    product: {
      type: Schema.ObjectId,
      ref: 'product',
    },
    competetiveProducts: [{
      type: Schema.ObjectId,
      ref: 'product',
    }]
  }],
  date: { type: Date, require: true, default: Date.now() },
});


module.exports = mongoose.model('project', projectSchema, 'projects');
