const mongoose = require('mongoose');

const { Schema, model } = mongoose;
mongoose.Promise = global.Promise;

const pendingOrderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  userEmail: {
    type: String
  },
  userPhone: {
    type: String
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],
  productSKU: [String],
  totalPrice: {
    type: Number
  },
  includesDigital: {
    type: Boolean,
    default: false
  },
  paymentType: {
    type: String
  },
  simpleHash: {
    type: String
  },
  isPhysicalSale: {
    type: Boolean
  }
});

module.exports = mongoose.models.PendingOrder || model('PendingOrder', pendingOrderSchema);