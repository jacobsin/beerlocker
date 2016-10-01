const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const beerController = require('./controllers/beer');
const userController = require('./controllers/user');

const passport = require('passport');
const authController = require('./controllers/auth');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/codeit');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(passport.initialize());

const port = process.env.PORT || 3000;

const router = express.Router();

router.get('/', function(req, res) {
  res.json({ message: 'You are running dangerously low on beer!' });
});

router.route('/beers')
  .post(authController.isAuthenticated, beerController.postBeers)
  .get(authController.isAuthenticated, beerController.getBeers);

router.route('/beers/:beer_id')
  .get(authController.isAuthenticated, beerController.getBeer)
  .put(authController.isAuthenticated, beerController.putBeer)
  .delete(authController.isAuthenticated, beerController.deleteBeer);

router.route('/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

app.use('/api', router);

app.listen(port);
console.log('Insert beer on port ' + port);
