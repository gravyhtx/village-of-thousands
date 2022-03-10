const mongoose = require('mongoose');

const { Schema, model } = mongoose;
mongoose.Promise = global.Promise;

const bcrypt = require('bcrypt');
const Order = require('./Order');

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
      type: Number,
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
    walletAddress: {
      type: String,
      required: false,
      default: ""
    },
    walletBalance: {
      type: Number,
      required: false,
      default: 0
    },
    completeRegistration: {
      type: Boolean,
      default: true
    },
    blockie: {
      type: String,
      required: false,
      default: ""
    },
    colorScheme: [String],
    orders: [Order.schema]
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