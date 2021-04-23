
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userLocationSchema = new Schema({
    lat: { type: String, require: true },
    lng: { type: String, require: true },
    time: { type: Date, require: true},
    user: {
      type: Schema.ObjectId,
      ref: 'user',
    },

});

module.exports = mongoose.model('userLocation', userLocationSchema, 'userLocations');
