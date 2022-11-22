const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
    type: String,
      unique: true,
      required: true, 
      trimmed: true
    },
      email: {
         type: String,
         required: true,
         unique: true,
         match: [/.+@.+\..+/, 'Please use a valid email address']
  },
   thoughts: [
      {  type: Schema.Types.ObjectId,
         _id: {ref: 'Thought'}
      }
   ],
   friends: [
     { type: Schema.Types.ObjectId, 
      _id: {ref: 'User'}
   }]
},
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
