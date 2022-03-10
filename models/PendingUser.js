const mongoose = require('mongoose');

const { Schema, model } = mongoose;
mongoose.Promise = global.Promise;

const bcrypt = require('bcrypt');

const pendingUserSchema = new Schema(
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
  },
  {
    toJSON: {
      virtuals: true
    }
  }
)

pendingUserSchema.pre('save', async function (next) {
  if(this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
});

module.exports =  mongoose.models.PendingUser || model('PendingUser', pendingUserSchema);