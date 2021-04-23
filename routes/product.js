const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const auth = require('../libraries/auth');
const productModel = require('../models/product');
const skuModel = require('../models/sku');

router.use('/create', auth.verify);
router.post('/create', async (req, res ) => {
  console.log(req.body)
  try {
    
    product = await productModel.create({
      name: req.body.name,
      classifications: req.body.classifications,
      brand: req.body.brand,
    });

    sskus = [];
    for(const skuu of req.body.skus){
      sk = await skuModel.create({
        sku : skuu.sku,
        price : skuu.price,
        product: product
      })
      sskus.push(sk);
    }

    product.skus = sskus;
    await product.save();
    product.save();
    res.json(product);

  } catch (error) {
    console.log(error);
    res.status(500).json({error: error})
  }
})

router.get('/:id', async (req, res) => {
  try {
    product = await productModel.findById(req.params.id).populate({path : 'classifications'}).populate({path : 'brand', child : {path : 'client'}});
    console.log("===================", product.skus);
    skus = await skuModel.find({_id: {$in: product.skus}});
    product = product.toObject();
    product.skus = skus
    console.log("###################", product.skus);
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({status: 'error',error: 'error deleting product'});
  }
})

router.use('/:id', auth.verify);
router.put('/:id', async (req, res ) => {
  try {

    product = await productModel.findById(req.params.id);
    product.name = req.body.name,
    product.classifications = req.body.classifications,
    product.brand = req.body.brand,
    product.edited = Date.now();
    await product.save()
    
    sskus = await skuModel.find({ product : product });
    for(const skuu of sskus){
      skuu.delete()
    }
    sskus = [];
    for(const skuu of req.body.skus){
      sk = await skuModel.create({
        sku : skuu.sku,
        price : skuu.price,
        product: product
      })
      sskus.push(sk);
    }

    product.skus = sskus
    await product.save()
    console.log(3)
    // await product.populate('region').populate('district').populate('skus');
    product  = await productModel.findById(req.params.id);
    console.log(4, product)
    res.json(product); 
    //res.json({}); 
    console.log(5)

  } catch (error) {
    console.log(error);
    res.status(500).json({error: error})
  }
})

router.delete('/:id', async (req, res) => {
  try {
    product = await productModel.findById(req.params.id);
    await product.delete();
    res.json({status: 'success'});
  } catch (err) {
    console.log(err);
    res.status(500).json({status: 'error',error: 'error deleting product'});
  }
})


router.use('/pagination', auth.verify);
router.get('/pagination/:limit/:offset?/:sort?', async (req, res) => {
  try {
    products = await productModel.find()
                .sort(req.params.sort ? req.params.sort : 'name')
                .skip(req.params.offset ? parseInt(req.params.offset) : 0)
                .limit(parseInt(req.params.limit));
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({status: 'error',error: 'error getting products'});
  }
})

router.use('/count', auth.verify);
router.get('/count', async (req, res) => {
  products = await productModel.countDocuments({}, (err, count) => {
    if (err) {
      console.log(err);
      res.status(500).json({status: 'error',error: 'error getting products'});
    }
    res.json({count: count});
  });
})

router.use('/', auth.verify);
router.get('/', async (req, res) => {
  try {
    products = await productModel.find({}).populate({path : 'brand', populate : { path : 'client' }}).populate('skus').populate('classifications').sort('name');
    console.log(products);
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({status: 'error',error: 'error getting products'});
  }
})



module.exports = router;
