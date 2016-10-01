const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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

require('./routes/beers')(router);

app.use('/api', router);

app.listen(port);
console.log('Insert beer on port ' + port);
