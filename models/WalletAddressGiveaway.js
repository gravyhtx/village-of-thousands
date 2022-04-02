const mongoose = require('mongoose');

const { Schema, model } = mongoose;
mongoose.Promise = global.Promise;

const walletAddressGiveawaySchema = new Schema({
    walletAddress: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    userId: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true
    },
    walletId: {
        type: String,
        required: true
    }
});
  
//   const walletAddressGiveaway = model('WalletAddressGiveaway', walletAddressGiveawaySchema);
  
module.exports =  mongoose.models.WalletAddressGiveaway || model('WalletAddressGiveaway', walletAddressGiveawaySchema);
  