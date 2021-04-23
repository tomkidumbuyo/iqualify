const express = require('express');
const router = express.Router();
const outletModel = require('../models/outlet')
const saleModel = require('../models/sale')
const districtModel = require('../models/district')
const outletClassificationModel = require('../models/outletClassification')
const outletAttributeModel = require('../models/outletAttribute')
const auth = require('../libraries/auth');
const geojson = require('../libraries/geojson');

router.use('/create', auth.verify);
router.post('/create', async (req, res ) => {
  try {
    outlet = await outletModel.create({
      name: req.body.name,
      owner: req.body.first_name + ' ' + req.body.last_name,
      phone: req.body.phone,
      region: req.body.region,
      district: req.body.district,
      town: req.body.town
    })
    res.json(outlet);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: error})
  }
})

router.get('/classifications', async(req, res) => {
  try{
    outletClassification = await outletClassificationModel.find({})
    if (outletClassification == null) {
      outletClassification = []
    }
    res.json(outletClassification);
  } catch(error) {
    console.log(error);
    res.status(500).json({error: error});
  }
});

router.get('/attributes', async(req, res) => {
  try{
    outletAttribute = await outletAttributeModel.find({})
    if (outletAttribute == null) {
      outletAttribute = []
    }
    res.json(outletAttribute);
  } catch(error) {
    console.log(error);
    res.status(500).json({error: error});
  }
});


router.get('/sync/:datetime', async (req, res) => {
  try {

    date = new Date(req.params.datetime)
    outlets = await outletModel.find({created: null});

    outlets = await outletModel.find({$or: [
      {created: { $gte : date }},
      {edited: { $gte : date }},
    ]});
    res.json(outlets);
  } catch (err) {
    console.log(err);
    res.status(500).json({status: 'error',error: 'error getting outlets'});
  }
})

router.use('/pagination', auth.verify);
router.get('/pagination/:limit/:offset?/:sort?', async (req, res) => {
  try {

    outlets = await outletModel.find()
                .sort(req.params.sort ? req.params.sort : 'name')
                .skip(req.params.offset ? parseInt(req.params.offset) : 0)
                .limit(parseInt(req.params.limit))
                .populate('region')
                .populate('district')
                .populate('ward');
    
    for (const outlet of outlets) {
      outletClassifications = await outletClassificationModel.find({outlet: outlet}).populate('classification');
      outlet.classifications = outletClassifications.map(outletClassification => outletClassification.classification)          
    }
    
    res.json(outlets);

  } catch (err) {
    console.log(err);
    res.status(500).json({status: 'error',error: 'error getting outlets'});
  }
})

router.use('/count', auth.verify);
router.get('/count', async (req, res) => {
  outletModel.countDocuments({}, (err, count) => {

    console.log('\n\n\n\n\n\n count',count)
    if (err) {
      console.log(err);
      res.status(500).json({status: 'error',error: 'error getting count'});
    }
    res.json({count: count});
  });
})


router.post('/byregions', async (req, res) => {
  try {
    districts = await districtModel.find({region: { $in : req.body.regions}});
    outlets = await outletModel.find({district: { $in : districts.map(district => district._id)}});
    res.json(outlets);
  } catch (err) {
    console.log(err);
    res.status(500).json({status: 'error',error: 'error getting outlets'});
  }
})


router.get('/:id', async (req, res) => {
  try {
    outlet = await outletModel.findById(req.params.id);
    outletClassifications = await outletClassificationModel.find({outlet: outlet}).populate('classification');
    outlet.classifications = outletClassifications.map(outletClassification => outletClassification.classification)
    res.json(outlet);
  } catch (err) {
    console.log(err);
    res.status(500).json({status: 'error',error: 'error deleting outlet'});
  }
})

router.get('/:id/sales', async (req, res) => {
  try {
    sales = await saleModel.find({outlet: req.params.id}).populate('projects');
    res.json(sales);
  } catch (err) {
    console.log(err);
    res.status(500).json({status: 'error',error: 'error deleting outlet'});
  }
})

router.use('/:id', auth.verify);
router.put('/:id', async (req, res ) => {
  try {
    outlet = await outletModel.findById(req.params.id);
    outlet.name = req.body.name;
    outlet.owner = req.body.first_name + ' ' + req.body.last_name;
    outlet.phone = req.body.phone;
    outlet.region = req.body.region;
    outlet.district = req.body.district;
    outlet.town = req.body.town;
    outlet.edited = Date.now();
    await outlet.save()
    await outlet.populate('region').populate('district');
    res.json(outlet);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: error})
  }
})

router.delete('/:id', async (req, res) => {
  try {
    outlet = await outletModel.findById(req.params.id);
    await outlet.delete();
    res.json({status: 'success'});
  } catch (err) {
    console.log(err);
    res.status(500).json({status: 'error',error: 'error getting outlet'});
  }
})


router.use('/', auth.verify);
router.get('/', async (req, res) => {
  try {
    outlets = await outletModel.find().sort('name').populate('region').populate('district').populate('ward');
    for (const outlet of outlets) {
      if(!outlet.ward) {
        loc = await geojson.getLocation(outlet.latlng.lat, outlet.latlng.lng);
        console.log(loc)
        outlet.ward = loc.ward;
        outlet.district = loc.district;
        outlet.region = loc.region;
        await outlet.save();
      }
      outletClassifications = await outletClassificationModel.find({outlet: outlet}).populate('classification');
      outlet.classifications = outletClassifications.map(outletClassification => outletClassification.classification)
      
    }
    res.json(outlets);
  } catch (err) {
    console.log(err);
    res.status(500).json({status: 'error',error: 'error getting outlets'});
  }
})

module.exports = router;
