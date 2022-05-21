const mongoose = require('mongoose');

const { Schema, model } = mongoose;
mongoose.Promise = global.Promise;

const dropSchema = new Schema(
	{
		drop_number: {
			type: Number
		},
		drop_date: {
			type: Date
		},
		product_lineup: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Category'
			}
		],
		initial_drop_quantity: {
			type: Number
		}
	}
);

// const Order = model('Order', orderSchema);

module.exports = mongoose.models.Drop || model('Drop', dropSchema);
