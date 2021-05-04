const express = require('express');
const router = express.Router();
const countries = require("i18n-iso-countries");
const userModel = require('../models/user');
const mailer = require('../libraries/mailer')


router.get('/wards', async (req, res ) => {
  wards = await wardModel.find({})
  res.json(wards);
});

router.get('/mail', async (req, res ) => {
  // wards = await wardModel.find({})
  mail = await mailer.sendText(
    'thomasalex37@rocketmail.com',
    'mryoungtommy@gmail.com',
    'test subject',
    'test message'
  )
  res.json(mail);
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
