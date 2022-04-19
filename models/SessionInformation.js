const mongoose = require('mongoose');

const { Schema, model } = mongoose;
mongoose.Promise = global.Promise;

const sessionInformationSchema = new Schema(
    {
        loggedInDates: [Date]
    }
);

//   const walletAddressGiveaway = model('WalletAddressGiveaway', walletAddressGiveawaySchema);

module.exports = mongoose.models.SessionInformation || model('SessionInformation', sessionInformationSchema);
