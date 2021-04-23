const express = require('express');
const router = express.Router();
const auth = require('../libraries/auth');
const brandModel = require('../models/brand');
const phoneModel = require('../models/phone');
const productModel = require('../models/product');

router.use('/create', auth.verify);
router.post('/create', async(req, res) => {
  try {
    phones = [];
    for (const pn of req.body.manager.phones) {
      pnn = await phoneModel.create(pn);
      phones.push(pnn);
    }
    brand = await brandModel.create({
      name: req.body.name,
      client: req.body.client,
      manager: {
        name: req.body.manager.name,
        phones: phones,
        email: req.body.manager.email,
      },
    })
    res.json(brand);
  } catch (error) {
    console.log(error);
    res.status(500).json(client);
  }
});

router.use('/', auth.verify);
router.get('/', async(req, res) => {
  try {
    brands = await brandModel.find({});
    res.json(brands);
  } catch (error) {
    console.log(error);
    res.status(500).json(client);
  }
});

router.use('/products/:id', auth.verify);
router.get('/products/:id', async(req, res) => {
  try {
    products = await productModel.find({brand: req.params.id}).populate('classifications').populate({path: "brand", populate : "client"}).populate('skus');
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json(client);
  }
});

router.use('/:id', auth.verify);
router.get('/:id', async(req, res) => {
  try {
    
    brand = await brandModel.findById(req.params.id).populate('manager.phones');
    res.json(brand);
  } catch (error) {
    console.log(error);
    res.status(500).json(client);
  }
});

module.exports = router;
