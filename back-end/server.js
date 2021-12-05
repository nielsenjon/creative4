const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});


const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/creative', {
  useNewUrlParser: true
});

// Create a scheme for items in the museum: a title and a path to an image.
const itemSchema = new mongoose.Schema({
  title: String,
  path: String,
  description: String,
});

const orderSchema = new mongoose.Schema({
  game: String,
  name: String,
  streetAdd: String,
  city: String,
  state: String,
  zip: String,
});

const gameSchema = new mongoose.Schema({
  game: String,
});

// Create a model for items in the museum.
const Item = mongoose.model('Item', itemSchema);
const Order = mongoose.model('Order', orderSchema);
const Game = mongoose.model('Game', gameSchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

app.post('/api/order', async(req, res) => {
  const order = new Order({
    game: req.body.game,
    name: req.body.name,
    streetAdd: req.body.streetAdd,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
  });
  try {
    await order.save();
    res.send(order);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post('/api/game', async (req, res) => {
  const newGame = new Game({
    game: req.body.game,
  });
  try {
    await newGame.save();
    res.send(newGame);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.get('/api/order', async (req, res) => {
  try {
    let orders = await Order.find();
    res.send(orders);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.get('/api/game', async (req, res) => {
  try {
    let games = await Game.find();
    res.send(games);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/items', async (req, res) => {
  const item = new Item({
    title: req.body.title,
    path: req.body.path,
    description: req.body.description,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Get a list of all of the items in the museum.
app.get('/api/items', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.delete('/api/items/:id', async (req, res) => {
  try {
    await Item.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.delete('/api/order/:id', async (req, res) => {
  try {
    await Order.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.delete('/api/game/:id', async (req, res) => {
  try {
    await Game.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.put('/api/game/:id', async (req, res) => {
  try {
    await Game.findOneAndUpdate(
      { _id: req.params.id },
      { game: req.body.game }
    );
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.put('/api/items/:id', async (req, res) => {
  try {
    await Item.findOneAndUpdate(
      { _id: req.params.id },
      { title: req.body.title,
        description: req.body.description }
    );
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});


app.listen(3000, () => console.log('Server listening on port 3000!'));
