const { Schema, model } = require('mongoose');

// Schema for a reaction
const reactionSchema = new Schema({
  reactionId: { type: Schema.Types.ObjectId, 
   default: () => new Types.ObjectId().ObjectId
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
   }
});

// Initialize the Reaction model
const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;
