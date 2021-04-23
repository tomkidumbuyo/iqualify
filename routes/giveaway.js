const express = require('express');
const router = express.Router();
const auth = require('../libraries/auth');
const giveawayModel = require('../models/giveaway');


router.use('/create', auth.verify);
router.post('/create', async (req, res) => {
  try{
    giveaway = await giveawayModel.create({
        name : req.body.name
    });
    res.json(giveaway);
  } catch(error){
    console.log(error);
    res.status(500).json({error: error});
  }
})


router.delete('/:id', async (req, res) => {
  try{
    giveaway = await giveawayModel.findById(req.params.id);
    giveaway.delete();
    res.json({status: 'success'});
  } catch(error){
    console.log(error);
    res.status(500).json({error: error});
  }
})

router.get('/:id', async (req, res) => {
    try{
        giveaway = await giveawayModel.findById(req.params.id);
        res.json(giveaway);
    } catch(error){
      console.log(error);
      res.status(500).json({error: error});
    }
})

router.put('/:id', async (req, res) => {
    try{
        giveaway = await giveawayModel.findById(req.params.id);
        giveaway.name = req.body.name;
        giveaway.save();
        res.json(giveaway);
    } catch(error){
        console.log(error);
        res.status(500).json({error: error});
    }
})

router.use('/', auth.verify);
router.get('/', async (req, res) => {
  try{
    giveaways = await giveawayModel.find({});
    res.json(giveaways);
  } catch(error){
    console.log(error);
    res.status(500).json({error: error});
  }
})

module.exports = router;