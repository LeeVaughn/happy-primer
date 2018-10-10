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
  // creates random number based on number of documents in the Quotes database
  const index = Math.floor(Math.random() * 20);

   // returns all quotes
  Quote.find()
    .exec(function (err, quote) {
      if (err) {
        next(err);
      } else {
        // uses random number created above to select a quote and assign its properties to variables
        const quotation = quote[index].quote
        const source = quote[index].source

        res.render("quotes", { quotation, source });
      }
    });

  // let length;
  // let index;

  // // returns random quote the first time but undefined after that
  // Quote.countDocuments()
  //   .exec(function (err, count) {
  //     if (err) {
  //       next(err);
  //     } else {
  //       length = count - 1;
  //       index = Math.floor(Math.random() * length);
  //       console.log(length, index);
  //       // res.render("quotes");
  //     }
  //   });

  // Quote.find()
  //   .exec(function (err, quote) {
  //     if (err) {
  //       next(err);
  //     } else {
  //       console.log(index);
  //       console.log(quote[index]);
  //       res.render("quotes");
  //     }
  //   });

  // // calculates number of quotes in database
  // Quote.countDocuments()
  // .exec(function (err, count) {
  //   if (err) {
  //     next(err);
  //   } else {
  //     length = count - 1;
  //     console.log(length);
  //     // res.render("quotes");
  //   }
  // });

  // index = Math.floor(Math.random() * 20);

  // Quote.find()
  //   .exec(function (err, quote) {
  //     if (err) {
  //       next(err);
  //     } else {
  //       console.log(index);
  //       console.log(quote[index]);
  //       res.render("quotes");
  //     }
  //   });

  // // returns all quotes
  // Quote.find()
  //   .exec(function (err, quote) {
  //     if (err) {
  //       next(err);
  //     } else {
  //       console.log(quote[0]);
  //       res.render("quotes");
  //     }
  //   });

  // // returns a quote but it seems to always be the first one
  // Quote.findOne()
  //   .exec(function (err, quote) {
  //     if (err) {
  //       next(err);
  //     } else {
  //       console.log(quote.quote)
  //       res.render("quotes");
  //     }
  //   });
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
