const express = require('express');
const router = express.Router();
const randomColor = require('randomcolor');
const auth = require('../libraries/auth');
const classificationModel = require('../models/classification');
const classificationAttributeModel = require('../models/classificationAttribute');
const categoryModel = require('../models/category');
const firebase = require('../sync/firebase');


router.use('/', auth.verify);
router.get('/', async(req, res) => {
  try{
    classification = await classificationModel.find({
      category : null
    })
    for await (const classification of classification) {
      classification.categories = await loadCategories(classification);
    }

    res.json(classification? classification: []);
  } catch(error) {
    console.log(error)
    res.status(500).json({error: error});
  }
});

async function loadCategories(classification) {
  categories = await categoryModel.find({
    classification: classification
  })
  if(categories && categories.length()) {
    classification.categories = categories;
    for await (const category of classification.categories) {
      category.classification = await loadclassificationes(category);
    }
  }
  return categories;
}

async function loadclassificationes(category) {
  classification = await classificationModel.find({
    category: category
  })

  if(classification && classification.length()) {
    for await (const classification of classification) {
      classification.categories = await loadCategories(classification)
    }
  }
}

router.get('/categories', async(req, res) => {
  try{
    categories = await categoryModel.find({})
    if (categories == null) {
      categories = [];
    }
    res.json(categories);
  } catch(error) {
    console.log(error);
    res.status(500).json({error: error});
  }
});

router.get('/outlet/categories', async(req, res) => {
  try{
    categories = await categoryModel.find({for: 'outlet'})
    if (categories == null) {
      categories = [];
    }
    res.json(categories);
  } catch(error) {
    console.log(error);
    res.status(500).json({error: error});
  }
});

router.get('/classifications', async(req, res) => {
  try{
    classifications = await classificationModel.find({}).populate('attributes')
    if (classifications == null) {
      classifications = []
    }
    for (const classification of classifications) {
      if(classification.color == null || classification.color == undefined) {
        classification.color = randomColor();
        await classification.save();
      }
    }
    res.json(classifications);
  } catch(error) {
    console.log(error);
    res.status(500).json({error: error});
  }
});

router.get('/outlet/classifications', async(req, res) => {
  try{
    classification = await classificationModel.find({for: 'outlet'}).populate('attributes')
    if (classification == null) {
      classification = []
    }
    res.json(classification);
  } catch(error) {
    console.log(error);
    res.status(500).json({error: error});
  }
});

router.use('/category/create', auth.verify);
router.post('/category/create', async(req, res) => {
  try {
    category = await categoryModel.create({
      name: req.body.name,
      classification: req.body.classification,
      for: req.body.for
    })
    firebase.upstream(firebase.table.CATEGORY, firebase.action.SYNC, category.toObject());
    res.json(category)
  } catch (error) {
    console.log(error)
    res.status(500).json({error: error});
  }
})

router.use('/classification/create', auth.verify);
router.post('/classification/create', async(req, res) => {
  category = req.body.category == "" ? null : req.body.category ;
  try {
    classification = await classificationModel.create({
      name: req.body.name,
      category: category,
      for: req.body.for,
      color: randomColor()
    })
    firebase.upstream(firebase.table.CLASSIFICATION, firebase.action.SYNC, classification.toObject());
    res.json(classification);
  } catch (error) {
    console.log(error)
    res.status(500).json({error: error});
  }
})

router.use('/classification/:id', auth.verify);
router.get('/classification/:id',async(req, res) => {
  try {
    classification = await classificationModel.findById(req.params.id);
    res.json(classification)
  } catch (error) {
    console.log(error)
    res.status(500).json({status: 'error', error: error})
  }
});

router.use('/category/:id', auth.verify);
router.get('/category/:id',async(req, res) => {
  try {
    category = await categoryModel.findById(req.params.id);
    res.json(category)
  } catch (error) {
    console.log(error)
    res.status(500).json({status: 'error', error: error})
  }
});

router.put('/classification/:id',async(req, res) => {
  try {
    classification = await classificationModel.findById(req.params.id).populate('attributes');
      for (const attribute of classification.attributes) {
        // check if the attributes in databsse are in the post requests to verify if they are not deleted and also add the newsly added attributes
        deleted = true;
        for (const attr of req.body.attributes) {
          if(attr.name) {
            if (attribute._id.equals(attr._id)){
              deleted = false;
            } 
            
          } else {
            if (attribute._id.equals(attr)){
              deleted = false;
            } 
          } 
        }
        if(deleted == true) {
          classification.attributes.splice(classification.attributes.indexOf(attribute));
          atr = await classificationAttributeModel.findById(attribute._id);
          await atr.delete();
        }
      }

      attrs = await classificationAttributeModel.find({classification: classification._id});
      for (const attr of attrs) {
        deleted = true;
        for (const attribute of classification.attributes) {
          if (attribute._id.equals(attr._id)){
              deleted = false;
          } 
        }
        if(deleted == true) {
          await attr.delete();
        }
      }

      for (const attr of req.body.attributes) {
          if(!attr._id) {
            // if post attribute does not ahve an _id then save the attribute and add it to classificatio
            newAttribute = await classificationAttributeModel.create({
              name: attr.name,
              type: attr.type,
              unit: attr.unit,
              classification: classification._id
            })
            classification.attributes.push(newAttribute);
        } 
      }
    

    await classification.save();
    await classification.populate('attributes');
    firebase.upstream(firebase.table.CLASSIFICATION, firebase.action.UPDATE, classification.toObject());
    console.log('classification', classification.attributes);
    res.json(classification)

  } catch (error) {
    console.log(error)
    res.status(500).json({status: 'error', error: error})
  }
});


router.delete('/classification/:id',async(req, res) => {
  try {
    classification = await classificationModel.findById(req.params.id);
    classification.delete();
    firebase.upstream(firebase.table.CLASSIFICATION, firebase.action.DELETE, classification.toObject());
    res.json({status: 'success'})
  } catch (error) {
    console.log(error)
    res.status(500).json({status: 'error', error: error})
  }
});

router.delete('/category/:id',async(req, res) => {
  try {
    category = await categoryModel.findById(req.params.id);
    category.delete();
    firebase.upstream(firebase.table.CATEGORY, firebase.action.DELETE, category.toObject());
    res.json({status: 'success'})
  } catch (error) {
    console.log(error)
    res.status(500).json({status: 'error', error: error})
  }
});

router.use('/attributes', auth.verify);
router.post('/attributes/add/:id',async(req, res) => {
  try {
    classification = await classificationModel.findById(req.params.id);
    classificationAttribute = await classificationAttributeModel.create({

    });
    classification.attributes.push(classificationAttribute);
    classification.save();
    firebase.upstream(firebase.table.CLASSIFICATION, firebase.action.UPDATE, classification.toObject());
    res.json(classification);
  } catch (error) {
    console.log(error)
    res.status(500).json({status: 'error', error: error})
  }
})

router.get('/attributes', async(req, res) => {
  try {
    classificationAttributes = await classificationAttributeModel.find({});
    res.json(classificationAttributes);
  } catch (error) {
    console.log(error)
    res.status(500).json({status: 'error', error: error})
  }
})




module.exports = router;




