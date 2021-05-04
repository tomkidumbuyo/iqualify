const express = require('express');
const router = express.Router();
const countries = require("i18n-iso-countries");
const userModel = require('../models/user');


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

module.exports = router;
