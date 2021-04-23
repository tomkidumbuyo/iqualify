const express = require('express');
const router = express.Router();
const auth = require('../libraries/auth');
const clientModel = require('../models/client');
const phoneModel = require('../models/phone');
const brandModel = require('../models/brand');
const projectModel = require('../models/project');
const userModel = require('../models/user');

router.use('/create', auth.verify);
router.post('/create', async(req, res) => {
  try {
    phones = [];
    for (const pn of req.body.phones) {
      pnn = await phoneModel.create(pn);
      phones.push(pnn);
    }
    client = await clientModel.create({
      name: req.body.name,
      classification: req.body.classification,
      phones: phones,
      website: req.body.website,
      adress: req.body.adress,
      email: req.body.email,
    })
    res.json(client);
  } catch (error) {
    console.log(error);
    res.status(500).json(client);
  }
});


router.use('/', auth.verify);
router.get('/', async(req, res) => {
  try {
    clients = await clientModel.find({}).populate('phones');
    res.json(clients);
  } catch (error) {
    console.log(error);
    res.status(500).json(client);
  }
});

router.use('/phone/add/:id', auth.verify);
router.put('/phone/add/:id', async(req, res) => {
  try{
    client = await clientModel.findById(req.params.id).populate('phones');
    client.save();
    res.json(client);
  } catch (error) {
    console.log(error);
    res.status(500).json(client);
  }
})

router.use('/phone/remove/:id', auth.verify);
router.put('/phone/remove/:id', async(req, res) => {
  try{
    client = await clientModel.findById(req.params.id).populate('phones');
    client.save();
    res.json(client);
  } catch (error) {
    console.log(error);
    res.status(500).json(client);
  }
})

router.use('/brands/:id', auth.verify);
router.get('/brands/:id', async(req, res) => {
  try{
    brands = await brandModel.find({client: req.params.id});
    res.json(brands);
  } catch (error) {
    console.log(error);
    res.status(500).json(client);
  }
})


router.use('/projects/:id', auth.verify);
router.get('/projects/:id', async(req, res) => {
  try{
    projects = await projectModel.find({client: req.params.id});
    res.json(projects);
  } catch (error) {
    console.log(error);
    res.status(500).json(client);
  }
})

router.use('/:id', auth.verify);
router.put('/:id', async(req, res) => {
  try {
    client = await clientModel.findById(req.params.id);
    client.name = req.body.name;
    client.classification = req.body.classification;
    client.phones = phones;
    client.website = req.body.website;
    client.adress = req.body.adress;
    client.email = req.body.email;
    client.save();

    res.json(clients);
  } catch (error) {
    console.log(error);
    res.status(500).json(client);
  }
});

router.use('/:id', auth.verify);
router.get('/:id', async(req, res) => {
  try {
    clients = await clientModel.findById(req.params.id).populate('phones');
    res.json(clients);
  } catch (error) {
    console.log(error);
    res.status(500).json(client);
  }
});


router.get('/:id/users', async(req, res) => {
  try {
    users = await userModel.find({client : req.params.id});
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(client);
  }
});


router.delete('/:id', async(req, res) => {
  try {

    client = await clientModel.findById(req.params.id);
    brands = await brandModel.find({client : client});
    projects = await projectModel.find({client : client});
    for (const brand of brands) {
      brand.delete();
    }
    for (const project of projects) {
      project.delete();
    }
    clients.delete();
    res.json({
      status : 'success'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(client);
  }
  
});



module.exports = router;
