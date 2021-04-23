const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const auth = require('../libraries/auth')
const visit = require('../libraries/visit')
const projectModel = require('../models/project');
const productModel = require('../models/product');
const saleModel = require('../models/sale');
const saleItemModel = require('../models/saleItem');
const userModel = require('../models/user');
const outletPosmModel = require('../models/outletPosm');
const outletGiveawayModel = require('../models/outletGiveaway');
const outletProductModel = require('../models/outletProduct');


router.use('/', auth.verify);
router.get('/',(req, res ) => {
    user = req.user.toObject();
    res.json(user);
})

router.use('/project', auth.verify);
router.get('/project',async (req, res ) => {
    console.log(req.user.project);
    if(req.user.project) {
      project = await projectModel.findById(req.user.project._id).populate({path: 'products'});
      res.json(project);
    } else {
      res.status(500).json({
        error: 'user Does not have current project running'
      })
    }
})


router.use('/products', auth.verify);
router.get('/products',async (req, res ) => {
    console.log(req.user.project);
    if(req.user.project) {
      project = await projectModel.findById(req.user.project._id);
      console.log(project);
      productIDs = project.products.filter(product => mongoose.Types.ObjectId(product.product));
      products = (await productModel.find({'_id': { $in: productIDs}}).populate({path: 'skus', model: 'sku'})).map(prdt => {
        prdt = prdt.toObject();
        prdt.project = project._id;
        return prdt;
      })
      res.json(products);
    } else {
      res.status(500).json({
        error: 'user Does not have current project running'
      })
    }
})

router.use('/sales', auth.verify);
router.get('/sales',async (req, res ) => {
    console.log(req.user.project);
    if(req.user.project) {
      project = await projectModel.findById(req.user.project._id);
      sales = await saleModel.find({project:project, user: req.user._id}).populate('items');
      for (const sale of sales) {
        sale.items = await saleItemModel.find({sale : sale});
      }
      res.json(sales);
    } else {
      res.status(500).json({
        error: 'user Does not have current project running'
      })
    }
})

router.use('/posms', auth.verify);
router.get('/posms',async (req, res ) => {
    console.log(req.user.project);
    if(req.user.project) {
      project = await projectModel.findById(req.user.project._id).populate('posms');
      res.json(project.posms);
    } else {
      res.status(500).json({
        error: 'user Does not have current project running'
      })
    }
})

router.use('/giveaways', auth.verify);
router.get('/giveaways',async (req, res ) => {
    console.log(req.user.project);
    if(req.user.project) {
      project = await projectModel.findById(req.user.project._id).populate('giveaways');
      res.json(project.giveaways);
    } else {
      res.status(500).json({
        error: 'user Does not have current project running'
      })
    }
})

router.use('/outlet/products', auth.verify);
router.get('/outlet/products',async (req, res ) => {
    console.log(req.user.project);
    if(req.user.project) {
      visits = await visit.userTodayVisits(req.user)
      outletProducts = await outletProductModel.find({visit : {$in : visits.map(visit => visit._id)}})
      res.json(outletProducts);
    } else {
      res.status(500).json({
        error: 'user Does not have current project running'
      })
    }
})

router.use('/outlet/posms', auth.verify);
router.get('/outlet/posms',async (req, res ) => {
    console.log(req.user.project);
    if(req.user.project) {
      visits = await visit.userTodayVisits(req.user)
      outletPosms = await outletPosmModel.find({visit : {$in : visits.map(visit => visit._id)}})
      res.json(outletPosms);
    } else {
      res.status(500).json({
        error: 'user Does not have current project running'
      })
    }
})

router.use('/outlet/giveaways', auth.verify);
router.get('/outlet/giveaways',async (req, res ) => {
    console.log(req.user.project);
    if(req.user.project) {
      visits = await visit.userTodayVisits(req.user)
      outletGiveaways = await outletGiveawayModel.find({visit : {$in : visits.map(visit => visit._id)}})
      res.json(outletGiveaways);
    } else {
      res.status(500).json({
        error: 'user Does not have current project running'
      })
    }
})


router.use('/all', auth.verify);
router.get('/all',(req, res ) => {
    user = req.user.toObject();
    res.json(user);
})


router.use('/project/', auth.verify);
router.get('/project/:id', async (req, res ) => {
    users = await userModel.find({project : req.params.id});
    res.json(users);
})

router.use('/outlet/images', auth.verify);
router.get('/outlet/images',async (req, res ) => {
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
