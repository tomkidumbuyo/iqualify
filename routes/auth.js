const express = require('express');
const router = express.Router();
const auth = require('../libraries/auth');
const userModel = require('../models/user')


// Registration
router.post('/register', async (req, res ) => {

    hostname = req.headers.host;

    password = req.body.password;
    verify_password = req.body.verify_password;
    email = req.body.email;

    auth.register(email,password,verify_password,req)
    .then(async (data) => {
      if(req.body.user_attributes) {
        try {
          user = await userModel.updateOne({_id:data.user._id},{$set: req.body.user_attributes})
          data.user = await userModel.findById(data.user._id);
            res.json(data);
        } catch (err) {
          console.log(err)
          res.status(500).json(err);
        }
      } else  {
        res.json(data);
      }
    })
    .catch(err => {
      res.status(500).json({message: "Error signing up. " + err});
      return;
    });
});

// login
router.post('/login',(req, res ) => {
    email = req.body.email;
    password = req.body.password;

    auth.login(email,password,req)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({message: "Error signing in. " + err});
      return;
    });
});

router.post('/isLoggedIn',(req, res ) => {
  auth.verify_token(req.body.accessToken)
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    res.status(500).json({error: err});
  });
});

router.use('/user/:id', auth.verify);
router.put('/user/:id', async (req, res) => {
  let user_attributes = req.body
  if (user_attributes.password) {
    delete user_attributes.password
  }
  if (user_attributes._id) {
    delete user_attributes._id
  }
  await userModel.updateOne({_id:req.params.id},{$set: user_attributes});
  user = await userModel.findById(req.params.id).populate('region').populate('dc')
  res.json(user);
})

router.use('/changePassword/:id', auth.verify);
router.put('/changePassword/:id', async (req, res) => {
  if (req.body.password) {
    try {
      user = await userModel.findById(req.params.id);
      user.password = req.body.password
      await accessTokenModel.deleteMany({
        user_id: req.params.id
      });
      await user.save();
      res.json(user);
    } catch(err) {
      console.log(err);
      res.status(500).json({
        status: 'failed',
        error: err
      });
    }
  } else {
    res.status(500).json({
      status: 'failed',
      error: 'Passord not set.'
    });
  }
})



module.exports = router;
