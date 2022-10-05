const mongoose = require('mongoose');

const { Schema, model } = mongoose;
mongoose.Promise = global.Promise;

const shippingAddress = new Schema(
  {
    addressOne: {
      type: String,
    },
    addressTwo: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    zip: {
      type: String
    }
  }
)

const billingAddress = new Schema(
  {
    addressOne: {
      type: String,
    },
    addressTwo: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    zip: {
      type: String
    }
  }
)

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],
  productSKU: [String],
  paymentConfirmation: {
    type: String
  },
  deliveryStatus: {
    type: String,
    default: "Processing"
  },
  trackingNumber: {
    type: String
  },
  shippingAddress: shippingAddress,
  billingAddress: billingAddress,
  totalPrice: {
    type: Number
  },
  specialInstructions: {
    type: String
  },
  includesDigital: {
    type: Boolean,
    default: false
  }
});

// const Order = model('Order', orderSchema);

module.exports = mongoose.models.Order || model('Order', orderSchema);
