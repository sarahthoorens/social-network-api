const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

// Schema for what makes up a thought
const thoughtSchema = new Schema({
  thoughtText: { 
   type: String,
   required: true,
   minlength: 1,
   maxlength: 280
}, 
  createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal)  
    },

  updatedAt: {
      type: Date,
      default: Date.now,
      get: (updatedAtVal) => dateFormat(updatedAtVal)
  },
  username: {
      type: String,
      required: true
  },
  reactions: [Reaction],
},  
{timestamps: true, updatedAt: true, createdAt: true},

{ toJSON: {
      virtuals: true,
    },
    id: false,
  },
);

thoughtSchema.virtual('reactionCount')
.get(function() {
   return this.reactions.length;
})
// Initialize the Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
