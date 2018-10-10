const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuoteSchema = new Schema({
  quote: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true,
  }
});

const Quote = mongoose.model("Quote", QuoteSchema);

module.exports = Quote;
