const express = require('express');
const router = express.Router();
const commentModel = require('../models/comment')
const auth = require('../libraries/auth');

router.post('/create', async (req, res ) => {
  try {
    comment = await commentModel.create({
      name: req.body.name,
      platform: req.body.platform,
      positive: req.body.positive,
      negative: req.body.negative,
      neutral: req.body.neutral,
      date: req.body.date,
    })
    res.json(comment);
  } catch (error) {
    console.log(error)
    res.status(500).json({error: error})
  }
})


router.put('/:id', async (req, res ) => {
  try{
    comment = await commentModel.findById(req.params.id);
    await comment.updateOne(req.body);
    res.json(comment);
  } catch (error) {
    console.log(error)
    res.status(500).json({error: error})
  }
})

router.delete('/:id', async (req, res ) => {
  comment = await commentModel.findById(req.params.id);
  await comment.delete();
  res.json(comment);
})

router.get('/', async (req, res ) => {
  comments = await commentModel.find({});
  res.json(comments);
})

module.exports = router;
