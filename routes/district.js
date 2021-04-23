const express = require('express');
const router = express.Router();
const regionModel = require('../models/region');
const distributionCenterModel = require('../models/distribution_center');
const userModel = require('../models/user')
const outletsModel = require('../models/outlet')
const districtModel = require('../models/district')
const auth = require('../libraries/auth');

router.use('/create', auth.verify);
router.post('/create', async (req, res ) => {
  try {

    district = await districtModel.create({
      name: req.body.name,
      region: req.body.region
    })
    res.json(district);

  } catch (error) {
    res.status(500).json({error: error})
  }
})


router.use('/', auth.verify);
router.get('/', async (req, res ) => {
  districtModel.find({}, async (err, districts) => {
    if (err) {
      res.status(500).json({error: err});
      return
    }
    res.json(districts);
  })
})



router.use('/:id', auth.verify);
router.get('/:id', async (req, res ) => {
  try {
    district = await districtModel.findById(req.params.id)
    if (district) {
      res.json(district)
    } else {
      res.status(500).json({error: 'No district with that id'})
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({error: error})
  }

})



router.use('/:id', auth.verify);
router.delete('/:id', async (req, res) => {

  try {
    district = await districtModel.findById(req.params.id);
    district.delete();
    res.json({status: success});
  } catch(err) {
    console.log(err);
    res.status(500).json({status: failed});
  }

})

module.exports = router;
