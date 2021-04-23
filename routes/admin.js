const express = require('express');
const router = express.Router();
const auth = require('../libraries/auth');
const lidMovementModel = require('../models/lid_movement')
const userModel = require('../models/user')
const regionModel = require('../models/region')
const distributionCenterModel = require('../models/distribution_center')
const outletModel = require('../models/outlet')
const saleModel = require('../models/sale')


router.use('/users', auth.verify);
router.get('/users', async (req, res) => {
  try{
    users = await userModel.find({}).populate('region').populate('dc');
    res.json(users);
  } catch(error){
    console.log(error);
    res.status(500).json({error: error});
  }
})

router.use('/lidMovement', auth.verify);
router.get('/lidMovement', async (req, res) => {
  try{
    lidMovement = await lidMovementModel.find({})
    res.json(lidMovement);
  } catch(error){
    console.log(error);
    res.status(500).json({error: error});
  }
})

router.use('/dispatchs', auth.verify);
router.get('/dispatchs', async (req, res) => {
  try{
    lidMovement = await lidMovementModel.find({
      to : 'plant'
    })
    res.json(lidMovement);
  } catch(error){
    console.log(error);
    res.status(500).json({error: error});
  }
})

router.use('/regions', auth.verify);
router.get('/regions', async (req, res) => {
  try{
    let regions = await regionModel.find({})
    res.json(regions);
  } catch(error){
    console.log(error);
    res.status(500).json({error: error});
  }
})

router.use('/distributionCenters', auth.verify);
router.post('/distributionCenters', async (req, res) => {
  try{
    distributionCenters = await distributionCenterModel.find({region: { $in :  req.body.regions }}).populate('supervisor');
    res.json(distributionCenters);
  } catch(error){
    console.log(error);
    res.status(500).json({error: error});
  }
})

router.use('/outlets', auth.verify);
router.post('/outlets', async (req, res) => {
  try{
  let outlets = await outletModel.find({region: { $in : req.body.regions }});
  res.json(outlets);
} catch(error){
  console.log(error);
  res.status(500).json({error: error});
}
})

router.use('/lidMovements', auth.verify);
router.post('/lidMovements', async (req, res) => {
  try{
    let lidMovements = await lidMovementModel.find({distributionCenter: { $in : req.body.distributionCenters}})
      .populate('outlet')
      .populate('distributionCenter');
    res.json(lidMovements);
  } catch(error){
    console.log(error);
    res.status(500).json({error: error});
  }
})

router.use('/sales', auth.verify);
router.post('/sales', async (req, res) => {
  try{
    let sales = await saleModel.find({distributionCenter: { $in : req.body.distributionCenters}})
    res.json(sales);
  } catch(error){
    console.log(error);
    res.status(500).json({error: error});
  }
})



router.use('/verifyDispatch/:id', auth.verify);
router.post('/verifyDispatch/:id', async (req, res) => {
  lidMovement = await lidMovementModel.findById(req.params.id);
  lidMovement.verified = true;
  lidMovement.verified_by = req.user.id
  lidMovement.verified_time = new Date();
  await lidMovement.save()
  res.json(lidMovement);
})

router.use('/cancelDispatch/:id', auth.verify);
router.post('/cancelDispatch/:id', async (req, res) => {
  lidMovement = await lidMovementModel.findById(req.params.id)
  lidMovement.cancel = true;
  lidMovement.cancel_by = req.user.id
  lidMovement.cancel_time = new Date();
  await lidMovement.save()
  res.json(lidMovement);
})


router.use('/returnDispatch/:id', auth.verify);
router.get('/returnDispatch/:id', async (req, res) => {
  lidMovement = await lidMovementModel.findById(req.params.id)
  lidMovement.verified = false;
  lidMovement.verified_by = null
  lidMovement.verified_time = null;
  await lidMovement.save()
  res.json(lidMovement);
})

module.exports = router;




