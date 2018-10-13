# The Happiness Primer (aka Happy Primer)

Positive emotion, or "happiness", has been proven to fuel performance. The Happiness Primer is intended to provide a quick
dose of positive emotion whenever you need it. This idea is based on the principles of Positive Psychology as described
in [Sean Achor's](http://www.shawnachor.com/) book, ["The Happiness Advantage"](http://www.shawnachor.com/the-books/the-happiness-advantage/).

## Motivation

This project was created as a part of the Treehouse Full Stack JavaScript Techdegree program.

## Features

* The main page gives the user the option of viewing cute photos, funny gifs, or inspiring quotes
* The Flickr API is used to display photos
* The GIPHY API is used to display gifs
* A MongoDB database is used to return the various motivational quotes

## Future Improvements

* Add buttons to give users the option to view different types of photos or gifs
* Add the option to search for photos or gifts of the user's choice

## To Run

* Download project files by running ```git clone https://github.com/LeeVaughn/happy-primer```
* Navigate to the project folder
* Install dependencies with ```npm install```
* You will need to create your own .flickrCongif.js and .giphyConfig.js files for your API codes using this format:

``` javascript
const api_key = "...";

module.exports = api_key;
```

* These files should be saved in the root directory along with app.js
* You will also need to create a new MongoDB database named "quotes" and seed it with data from the seed-data directory
* Type ```npm start``` or ```node ./bin/www``` to run application (application runs on localhost:3000)

## Built With

* [Node.js](https://nodejs.org/en/)
* [Express](https://github.com/LeeVaughn/twitter-interface)
* [Pug](https://pugjs.org/api/getting-started.html)
* [Bootstrap 4](https://getbootstrap.com/)
* [MongoDB](https://www.mongodb.com/)

## APIs

* [Flickr](https://www.flickr.com/services/api/)
* [GIPHY](https://developers.giphy.com/)

## Dependencies

* [axios](https://www.npmjs.com/package/axios) Promise based HTTP client for the browser and Node.js
* [body-parser](https://www.npmjs.com/package/body-parser) Node.js body parsing middleware
* [cookie-parser](https://www.npmjs.com/package/cookie-parser)
* [mongoose](https://www.npmjs.com/package/mongoose) elegant MongoDB object modeling for Node.js
* [morgan](https://www.npmjs.com/package/morgan) HTTP request logger middleware for Node.js

## Links

* [Website](https://happy-primer.herokuapp.com/)
* [Repository](https://github.com/LeeVaughn/happy-primer)

## Author

[Daniel Lee Vaughn](https://github.com/LeeVaughn)
