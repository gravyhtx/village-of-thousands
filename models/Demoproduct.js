const mongoose = require('mongoose');

const { Schema, model } = mongoose;
mongoose.Promise = global.Promise;

const demodetailSchema = new Schema(
  {
    //SKU, size, abbr size, qty
    SKU: {
      type: String
    },
    product_size: {
      type: String
    },
    product_abbreviated_size: {
      type: String
    },
    product_inventory: {
      type: Number
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
)

const demoproductSchema = new Schema(
  {
    product_name: {
      type: String,
      required: true
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
    product_colors: 
      {
        type: String
      }
    ,
    product_genders: [
      {
        type: String
      }
    ],
    product_information: [demodetailSchema],
    price: {
      type: Number,
      required: false,
      min: 0.99
    },
    NFT_included: {
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

module.exports =  mongoose.models.Demoproduct || model('Demoproduct', demoproductSchema);