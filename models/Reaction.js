const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Schema for a reaction
const reactionSchema = new Schema({
  reactionId: { 
   type: Schema.Types.ObjectId,
   default: () => new Types.ObjectId()

},
   reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
   },
   username: {
      type: String,
      required: true,
   },
   createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal)
  },
},
{timestamps: true, updatedAt: true});

// Initialize the Reaction model
const Reaction = reactionSchema;

module.exports = Reaction;
