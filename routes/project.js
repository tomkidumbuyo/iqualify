const express = require('express');
const router = express.Router();
const auth = require('../libraries/auth');
const projectModel = require('../models/project');
const saleModel = require('../models/sale')
const posmModel = require('../models/posm')
const giveawayModel = require('../models/giveaway')

router.use('/create', auth.verify);
router.post('/create', async(req, res) => {
  try{
    project = await projectModel.create({
      name: req.body.name,
      client: req.body.client,
      brands: req.body.brands,
      from: req.body.from,
      to: req.body.to,
      contactPeople: req.body.contactPeople,
      products: req.body.products,
      regions: req.body.regions,
      posms: req.body.posms,
      giveaways: req.body.giveaways,
    })
    res.json(project);
  }catch(err){
    console.log(err)
    res.status(500).json({error: 'Error creating new project.'});
  }
});

router.use('/:id', auth.verify);
router.put('/:id', async(req, res) => {
  try{
    project = await projectModel.findById(req.params.id)
    project.name = req.body.name
    project.client = req.body.client
    project.brands = req.body.brands
    project.from = req.body.from
    project.to = req.body.to
    project.contactPeople = req.body.contactPeople
    project.products = req.body.products
    project.regions = req.body.regions
    project.posms = req.body.posms
    project.giveaways = req.body.giveaways
    await project.save();
    console.log('EDIT PROJECT : ' , project)
    res.json(project);
  }catch(err){
    console.log(err)
    res.status(500).json({error: 'Error creating new project.'});
  }
});

router.use('/:id', auth.verify);
router.get('/:id', async(req, res) => {
  try{
    project = await projectModel.findById(req.params.id).populate('regions').populate('brands').populate('client').populate('posms').populate('giveaways');
    // TODO await project.populate('product');
    res.json(project);
  }catch(err){
    console.log(err)
    res.status(500).json({error: 'Error creating new project.'});
  }
});


router.get('/:id/sales', async(req, res) => {
  try{
    let sales = await saleModel.find({project : req.params.id})
    res.json(sales);
  } catch(error){
    console.log(error);
    res.status(500).json({error: error});
  }
});

router.get('/:id/giveaways', async(req, res) => {
  try{
    let giveaways = await giveawayModel.find({project : req.params.id})
    res.json(giveaways);
  } catch(error){
    console.log(error);
    res.status(500).json({error: error});
  }
});

router.get('/:id/posms', async(req, res) => {
  try{
    let posms = await posmModel.find({project : req.params.id})
    res.json(posms);
  } catch(error){
    console.log(error);
    res.status(500).json({error: error});
  }
});

router.use('/', auth.verify);
router.get('/', async(req, res) => {
  try{
    projects = await projectModel.find().populate('regions').populate('brands').populate('client').populate('posms').populate('giveaways')
    res.json(projects);
  }catch(err){
    console.log(err)
    res.status(500).json({error: 'Error creating new project.'});
  }
});

module.exports = router;
