//MARK: --- REQUIRE MODULES
const port = process.env.PORT || 8080;
const express = require('express');
const expressApp = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const compression = require('compression');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
// const firebase = require('./sync/firebase.js');
const dotenv = require('dotenv');

dotenv.config();

// enable files upload
expressApp.use(fileUpload({
  createParentPath: true
}));

expressApp.use(compression())
expressApp.use(bodyParser.urlencoded({ extended: true }));
expressApp.use(morgan('dev'));

// Create link to Angular build directory

expressApp.use("/",express.static(__dirname + "/dist"));
expressApp.use("/files",express.static(__dirname + "/files"));

var originsWhitelist = [
  'http://localhost:4200',
  'http://127.0.01:4200'
];

var corsOptions = {
  origin: function(origin, callback){
    var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
  },
  credentials: false
};

expressApp.use(cors(corsOptions));

// firebaseSnapshot = null
// changed = false;
// downstreamRef = firebase.adminApp.database().ref("events/sync/upstream");
// downstreamRef.on("value", function(snapshot) {
//   firebaseSnapshot = snapshot;
//   changed = true;
// }, function (errorObject) {
//   console.log("The read failed: " + errorObject.code);
// });

// running = false;
// setInterval(async function () {
//   if(changed && !running) {
//     running = true;
//     changed = false;
//     await firebase.downstream(firebaseSnapshot)
//     running = false;
//   }
// }, 1000);

// import route files
const authRoutes = require('./routes/auth.js');
const assetsRoutes = require('./routes/assets.js');
const userRoutes = require('./routes/user.js');
const adminRoutes = require('./routes/admin.js');


// use routes
expressApp.use('/api/auth', authRoutes);
expressApp.use('/api/assets', assetsRoutes);
expressApp.use('/api/user', userRoutes);
expressApp.use('/api/admin', adminRoutes);


// redirects to angular
expressApp.use(function(req, res) {
  console.log(req.url);
  console.log(__dirname + '/dist/index.html');
  res.sendFile(__dirname + '/dist/index.html'); // will execute angular code
});



mongoose.connection.on("open", function(ref) {
  console.log("Connected to mongoDb server.");
});

mongoose.connection.on("error", function(err) {
  console.log("Could not connect to mongo server!");
  return console.log(err);
});

db = mongoose.connect('mongodb+srv://root:' + process.env.DB_PASSWORD + '@cluster0.pnv64.mongodb.net/soko?retryWrites=true&w=majority', {
// db = mongoose.connect('mongodb+srv://root:' + process.env.DB_PASSWORD + '@school-yxbkk.mongodb.net/amplify?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
});

//init the server
expressApp.listen(port, () => {
   console.log(`listening on port ${port}`);
});

module.exports = expressApp;

