const mongoose = require('mongoose');

const { Schema, model } = mongoose;
mongoose.Promise = global.Promise;

const bcrypt = require('bcrypt');
const Order = require('./Order');
const WalletAddress = require('./WalletAddress');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address']
    },
    password: {
      type: String,
      required: true
    },
    seedHex: {
      type: String,
      required: false
    },
    first_name: {
      type: String,
      required: false,
      default: ""
    },
    last_name: {
      type: String,
      required: false,
      default: ""
    },
    phone: {
      type: String,
      required: false
    },
    addressOne: {
      type: String,
      required: false
    },
    addressTwo: {
      type: String,
      required: false
    },
    city: {
      type: String,
      required: false
    },
    state: {
      type: String,
      required: false
    },
    zip: {
      type: String,
      required: false
    },
    blockie: {
      type: [String],
      required: false,
      default: ["", false]
    },
    colorScheme: [String],
    walletAddress: [WalletAddress.schema],
    orders: [Order.schema],
    completeRegistration: {
      type: Boolean,
      default: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    sessionInformation: {
      type: Schema.Types.ObjectId,
      ref: 'SessionInformation',
      required: true
    }
  },
  {
    toJSON: {
      virtuals: true
    }
  }
)

// userSchema.pre('save', async function (next) {
//   if(this.isNew || this.isModified('password')) {
//     const saltRounds = 10;
//     this.password = await bcrypt.hash(this.password, saltRounds);
//   }
// });

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// const User = model('User', userSchema);

module.exports =  mongoose.models.User || model('User', userSchema);