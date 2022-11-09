const mongoose = require('mongoose');

const { Schema, model } = mongoose;
mongoose.Promise = global.Promise;

const eventActiveSchema = new Schema(
	{
		isActive: {
      type: Boolean
    }
  }
);

module.exports = mongoose.models.EventActive || model('EventActive', eventActiveSchema);