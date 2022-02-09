require('dotenv').config()

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3002,
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  cors = require('cors');
  const passport = require('passport');
  const FacebookStrategy   = require("passport-facebook").Strategy;
  const GoogleStrategy = require('passport-google-oauth20').Strategy;
  const multer = require('multer');
  const path = require('path');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/quiz_app',
{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => {
  console.log("Connected !!!")
}).catch(err => {
  console.log(err);
});

app.use(cors({}))
app.use(bodyParser.json());

//passport 
passport.use(new FacebookStrategy({
  clientID: process.env.FB_KEY,
  clientSecret: process.env.FB_SERCET,
  callbackURL: "http://localhost:3002/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, cb) {
  console.log('accessToken')
  // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
  //   return cb(err, user);
  // });
  return cb(null,profile)
}
));

// 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'img'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,uniqueSuffix  + '-' + file.originalname)
  }
})
const upload = multer({ storage: storage }).any()
app.use(upload)
app.use(express.static('img'))
// 
var routes = require('./api/route');
routes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});
app.listen(port);

console.log('Server started on: ' + port);
