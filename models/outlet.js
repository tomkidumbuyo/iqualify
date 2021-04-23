
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const outletSchema = new Schema({

    tempId: { type: String },
    number: { type: String },
    name: { type: String, require: true },
    owner: { type: String, require: true },
    phone: { type: String },
    tin: { type: String },
    brn: { type: String },
    classification: { type: String, enum: ['','mainstream','premium','club']},
    seats: { type: Number},
    amenities: [{
      type: String,
      enum: ['kitchen', 'DSTV', 'pool table', 'DJ']
    }],
    counters:  { type: Number },
    latlng: {
      lng: { type: String },
      lat: { type: String }
    },
    region: {
      type: Schema.ObjectId,
      ref: 'region',
      required: false
    },
    district: {
      type: Schema.ObjectId,
      ref: 'district',
      required: false
    },
    ward: {
      type: Schema.ObjectId,
      ref: 'ward',
      required: false
    },
    classifications: [{
      type: Schema.ObjectId,
      ref: 'classification',
    }],
    user: {
      type: Schema.ObjectId,
      ref: 'user',
      required: false
    },
    images: [{
      type: String,
    }],
    town: { type: String},
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
    
    
});

module.exports = mongoose.model('outlet', outletSchema, 'outlets');
