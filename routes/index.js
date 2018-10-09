const express = require("express");
const axios = require("axios");
const router = express.Router();
// const flickrAPI = require("../.flickrConfig.js");
const giphyAPI = require("../.giphyConfig.js");
const limit = 12;
let gifs = [];
let photos = [];

// GIPHY API call
axios.get(`http://api.giphy.com/v1/gifs/search?q=cute+animals&api_key=${giphyAPI}&limit=${12}`)
  .then(function (res) {
    console.log("GIPHY API call successful");
    for (let i = 0; i < limit; i++) {
      const gif = {
        "url": res.data.data[i].images.downsized.url
      }
      gifs.push(gif);
    }
  })
  .catch(function (err) {
    console.log("Error making GIPHY call");
  });

// GET home route
router.get("/", function(req, res, next) {
  res.render("index", { title: "The Happiness Primer" });
});

// GET photos route
router.get("/photos", function(req, res, next) {
  res.render("photos");
});

// GET gifs route
router.get("/gifs", function(req, res, next) {
  res.render("gifs", { gifs });
});

// GET quotes route
router.get("/quotes", function(req, res, next) {
  res.render("quotes");
});

module.exports = router;
