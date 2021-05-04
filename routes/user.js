const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const auth = require('../libraries/auth')
const userModel = require('../models/user');



router.use('/', auth.verify);
router.get('/',(req, res ) => {
    user = req.user.toObject();
    res.json(user);
})

router.use('/all', auth.verify);
router.get('/all',(req, res ) => {
    user = req.user.toObject();
    res.json(user);
})


router.post('/:id',(req, res ) => {
  userModel.findOne({created_by : req.user})
  .then(data => {

  })
  .catch(err => {

  })
})

router.use('/update', auth.verify);
router.put('/update', async (req, res) => {

  id = req.body._id
  delete req.body._id
  await userModel.updateOne({_id:id},req.body)
  const user = await userModel.findOne(req.body._id);
  res.json(user)

})

router.get('/emailAutocomplete', async (req, res) => {

  console.log('\n\n\n query', req.query.query);
  userModel.find(
    {
      "email":{ "$regex": req.query.query , "$options": "i" }
    },
    function(err,docs) {
      console.log('\n\n\n docs', docs)

      if (err) {
        res.status(500).json(err);
        return;
      }
      if (!docs.length) {
        res.json([]);
        return;
      }
      res.json(docs);
    }
  );


})

router.delete('/:id', async (req, res) => {

  if (req.user._id == req.params.id) {
    res.status(500).json({error: 'You cannot delete the loged in user.'})
    return
  }

  if (req.user._id == 'admin') {
    res.status(500).json({error: 'You do not have admin privilages.'})
    return
  }

  user = await userModel.findById(req.params.id)
  await user.delete();

  res.json({status: 'success'});

})

module.exports = router;
