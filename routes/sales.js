const express = require('express');
const router = express.Router();
const commentModel = require('../models/comment')
const saleModel = require('../models/sale');
const auth = require('../libraries/auth');

router.post('/out/create', auth.verify);
router.post('/out/create', async (req, res ) => {
  try {
    if (!req.body.cases && req.body.cases !== 0) {
      res.status(500).json({error: 'please fill in the cases'})
      return;
    }
    sale = await saleModel.create({
      cases: req.body.cases,
      type: 'out',
      distributionCenter: req.body.distributionCenter,
    })
    await sale.populate('outlet');
    res.json(sale);

  } catch (error) {
    console.log(error)
    res.status(500).json({error: error})
  }
})

router.post('/in/create', auth.verify);
router.post('/in/create', async (req, res ) => {
  console.log(req)
  try {
    if (!req.body.cases && req.body.cases !== 0) {
      res.status(500).json({error: 'please fill in the cases'})
      return;
    }
    sale = await saleModel.create({
      cases: req.body.cases,
      type: 'in',
      distributionCenter: req.body.distributionCenter,
    })
    res.json(sale);
  } catch (error) {
    console.log(error)
    res.status(500).json({error: error})
  }
})

router.post('/:id', auth.verify);
router.put('/:id', async (req, res ) => {
  try{
    sale = await saleModel.findById(req.params.id);
    await sale.updateOne(req.body);
    res.json(sale);
  } catch (error) {
    console.log(error)
    res.status(500).json({error: error})
  }
})

router.post('/:id', auth.verify);
router.delete('/:id', async (req, res ) => {
  sale = await saleModel.findById(req.params.id);
  await sale.delete();
  res.json(sale);
})

router.post('/', auth.verify);
router.get('/', async (req, res ) => {
  sales = await saleModel.find({});
  res.json(sales);
})


module.exports = router;
