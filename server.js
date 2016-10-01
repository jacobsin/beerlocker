const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const beerController = require('./controllers/beer');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/codeit');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const port = process.env.PORT || 3000;

const router = express.Router();

router.get('/', function(req, res) {
  res.json({ message: 'You are running dangerously low on beer!' });
});

router.route('/beers')
  .post(beerController.postBeers)
  .get(beerController.getBeers);

router.route('/beers/:beer_id')
  .get(beerController.getBeer)
  .put(beerController.putBeer)
  .delete(beerController.deleteBeer);

app.use('/api', router);

app.listen(port);
console.log('Insert beer on port ' + port);
