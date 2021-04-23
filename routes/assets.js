const express = require('express');
const router = express.Router();
const countries = require("i18n-iso-countries");
const userModel = require('../models/user');
const geojson = require('../libraries/geojson');
var regionModel = require('../models/region');
var districtModel = require('../models/district');
var wardModel = require('../models/ward');

router.get('/countries', (req, res ) => {
  res.json(countries.getNames("en"));
});

router.get('/regions', async (req, res ) => {
  regions = await regionModel.find({})
  res.json(regions);
});

router.get('/districts', async (req, res ) => {
  districts = await districtModel.find({})
  res.json(districts);
});

router.get('/wards', async (req, res ) => {
  wards = await wardModel.find({})
  res.json(wards);
});


router.get('/adminExists', (req, res ) => {
  userModel.find({
    type: 'admin',
  })
  .exec((err, data) => {
    if (err || !data.length) {
      res.json({status: false});
      return
    }
    res.json({status: true});
  });
});

router.post('/ward', async (req, res ) => {
  obj = await geojson.getWards(req.body.lat, req.body.lng)
  res.json(obj)
})

module.exports = router;
