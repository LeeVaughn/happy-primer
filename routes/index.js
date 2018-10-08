var express = require("express");
var router = express.Router();

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
