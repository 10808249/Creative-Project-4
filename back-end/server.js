const express = require('express');
const bodyParser = require("body-parser");
const multer = require('multer')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/project4', {
  useNewUrlParser: true
});

const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

const tourSchema = new mongoose.Schema({
  title: String,
  description: String,
  rating: Number,
  path: String,
});

const Tour = mongoose.model('Tour', tourSchema);

app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

app.post('/api/tours', async (req, res) => {
  //console.log(req);
  const tour = new Tour({
    title: req.body.title,
    description: req.body.description,
    rating: req.body.rating,
    path: req.body.path,
  });
  try {
    await tour.save();
    res.send(tour);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/tours', async (req, res) => {
  try {
    let tours = await Tour.find();
    res.send(tours);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/tours/:id', async (req, res) => {
  try {
    await Tour.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/tours/:id', async (req, res) => {
    try {
      const tour = await Tour.findOne({
        _id: req.params.id
      });
      tour.title = req.body.title;
      tour.description = req.body.description;
      tour.rating = req.body.rating;
      await tour.save();
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});

app.listen(3002, () => console.log('Server listening on port 3002!'));

