const express = require('express');
const router = express.Router();
const auth = require('../libraries/auth');
const posmModel = require('../models/posm');

router.use('/create', auth.verify);
router.post('/create', async (req, res) => {
  try{
    posm = await posmModel.create({
        name : req.body.name
    });
    res.json(posm);
  } catch(error){
    console.log(error);
    res.status(500).json({error: error});
  }
})


router.delete('/:id', async (req, res) => {
  try{
    posm = await posmModel.findById(req.params.id);
    posm.delete();
    res.json({status: 'success'});
  } catch(error){
    console.log(error);
    res.status(500).json({error: error});
  }
})

router.get('/:id', async (req, res) => {
    try{
        posm = await posmModel.findById(req.params.id);
        res.json(posm);
    } catch(error){
      console.log(error);
      res.status(500).json({error: error});
    }
})

router.put('/:id', async (req, res) => {
    try{
        posm = await posmModel.findById(req.params.id);
        posm.name = req.body.name;
        posm.save();
        res.json(posm);
    } catch(error){
        console.log(error);
        res.status(500).json({error: error});
    }
})

router.use('/', auth.verify);
router.get('/', async (req, res) => {
  try{
    posms = await posmModel.find({});
    res.json(posms);
  } catch(error){
    console.log(error);
    res.status(500).json({error: error});
  }
})

module.exports = router;