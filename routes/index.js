const express = require("express");
const axios = require("axios");
const router = express.Router();

// GIPHY API call
const getGifs = axios.get("http://api.giphy.com/v1/gifs/trending?api_key=RfkIjBEloXXrKNYJIjqijXyuXJJYFDUx")
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
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
  res.render("gifs");
});

// GET quotes route
router.get("/quotes", function(req, res, next) {
  res.render("quotes");
});

module.exports = router;
