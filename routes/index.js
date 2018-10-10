const express = require("express");
const axios = require("axios");
const router = express.Router();
const flickrAPI = require("../.flickrConfig.js");
const giphyAPI = require("../.giphyConfig.js");
const limit = 20;
let gifs = [];
let photos = [];
const Quote = require("../models/quote");

// Flickr API call
axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickrAPI}&tags=dogs+surfing&in_gallery=&per_page=${limit}&format=json&nojsoncallback=1`)
  .then(function (res) {
    console.log("Flickr API call successful");

    // loops over response data to create an array of urls for the individual photos
    for (let i = 0; i < limit; i++) {
      // variables used to construct url string
      const farm = res.data.photos.photo[i].farm;
      const server = res.data.photos.photo[i].server;
      const id = res.data.photos.photo[i].id;
      const secret = res.data.photos.photo[i].secret;

      const photo = {
        "url": `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
        // https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_[mstzb].jpg
      }
      photos.push(photo);
    }
  })
  .catch(function (err) {
    console.log("Error with Flickr API");
  });

// GIPHY API call
axios.get(`http://api.giphy.com/v1/gifs/search?q=cute+animals&api_key=${giphyAPI}&limit=${limit}`)
  .then(function (res) {
    console.log("GIPHY API call successful");

    // loops over response data to create an array of urls for the individual photos
    for (let i = 0; i < limit; i++) {
      const gif = {
        "url": res.data.data[i].images.downsized.url
      }
      gifs.push(gif);
    }
  })
  .catch(function (err) {
    console.log("Error with GIPHY API");
  });

// GET home route
router.get("/", function(req, res, next) {
  res.render("index", { title: "The Happiness Primer" });
});

// GET photos route
router.get("/photos", function(req, res, next) {
  res.render("photos", { photos });
});

// GET gifs route
router.get("/gifs", function(req, res, next) {
  res.render("gifs", { gifs });
});

// GET quotes route
router.get("/quotes", function(req, res, next) {
  res.render("quotes");
});

// POST quotes route
router.post("/quotes", (req, res, next) => {
  const quote = new Quote(req.body);

  quote.save((err, quote) => {
    if (err) {
      next(err);
    }
    res.status(201);
    res.location("/");
    res.send();
  });
});

module.exports = router;
