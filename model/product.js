const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    description: {
        type: String,
        required: true,
    },
    image: {
      type: URL,
      required: true,
      unique:true
    },
    date_c: {
        type: Date,
        default: Date.now,
    },
    date_u: {
      type: Date,
      default: Date.now,
  },
});

module.exports = Product = mongoose.model('product', ProductSchema);
