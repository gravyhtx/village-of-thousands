const mongoose = require('mongoose');

const { Schema, model } = mongoose;
mongoose.Promise = global.Promise;

const claimSchema = new Schema(
	{
		userEmail: {
			type: String
		},
    phone: {
      type: String
    },
		simpleHash: {
      type: String
    }
	}
);

module.exports = mongoose.models.Claim || model('Claim', claimSchema);