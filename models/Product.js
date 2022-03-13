const mongoose = require('mongoose');

const { Schema, model } = mongoose;
mongoose.Promise = global.Promise;

const productSchema = new Schema(
  {
    product_name: {
      type: String,
      required: true,
      unique: true
    },
    product_path: {
      type: String,
      required: true
    },
    product_image: [
      {
        type: String,
        required: false
      }
    ],
    product_description: [
      {
        type: String,
        required: false
      }
    ],
    product_colors: [
      {
        type: String
      }
    ],
    product_genders: [
      {
        type: String
      }
    ],
    product_sizes: [
      {
        type: String
      }
    ],
    SKU: {
      type: String,
      required: false
    },
    inventory: [
      {
        type: Number,
        required: false,
        min: 0
      }
    ],
    price: {
      type: Number,
      required: false,
      min: 0.99
    },
    NFT_include: {
      type: Boolean
    }
  },
  {
    toJSON: {
      virtuals: true
    }
  }
)

// const Product = model('Product', productSchema);

module.exports =  mongoose.models.Product || model('Product', productSchema);