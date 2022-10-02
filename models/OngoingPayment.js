const mongoose = require('mongoose');

const { Schema, model } = mongoose;
mongoose.Promise = global.Promise;

const ongoingPaymentSchema = new Schema(
  {
    paymentId: {
      type: String
    },
    userId: {
      type: String
    },
    userEmail: {
      type: String
    }
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

module.exports = mongoose.models.OngoingPayment || model('OngoingPayment', ongoingPaymentSchema);
