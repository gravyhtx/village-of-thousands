const mongoose = require('mongoose');

const { Schema, model } = mongoose;
mongoose.Promise = global.Promise;

const walletAddressSchema = new Schema({
    walletAddress: {
        type: String,
        required: true,
        // unique: true,
    },
    userId: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        min: 0
        // default: 0
    },
    chainId: {
        type: Number
    },
    blockNumber: {
        type: Number
    }
});

// const walletAddress = model('WalletAddress', walletAddressSchema);

module.exports =  mongoose.models.WalletAddress || model('WalletAddress', walletAddressSchema);
