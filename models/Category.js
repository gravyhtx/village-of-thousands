const mongoose = require('mongoose');

const { Schema, model } = mongoose;
mongoose.Promise = global.Promise;

const categorySchema = new Schema(
	{
		category_name: {
			type: String
		},
		products: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Product'
			}
		],
	}
);

// const Order = model('Order', orderSchema);

module.exports = mongoose.models.Category || model('Category', categorySchema);
