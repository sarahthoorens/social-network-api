const { User, Thought } = require('../models');
const path = require('path');

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single User
  getSingleUser(req, res) {
   User.findOne({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found with that id' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
   // Create a User
   createUser(req, res) {
      User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
   },
   // Update a User
   updateUser(req, res) {
      User.findOneAndUpdate({ _id: req.params.userId }, req.body, {
         new: true,
      }).then(() => {
         res.json({ message: 'User udpated' });
      })
      .catch((err) => res.status(500).json(err));
   },
   // Delete a User
   deleteUser(req, res) {
      User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => {
         !user
            ? res.status(404).json({ message: 'No user found with that id' })
        : Thought.deleteMany({ _id: { $in: user.thoughts } });
      }) 
      .then(() => {
         res.json({ message: 'User deleted' });
      })
      .catch((err) => res.status(500).json(err));
   },
// Add a friend
   addFriend(req, res) {
      User.findOneAndUpdate(
         { _id: req.params.userId },
         { $addToSet: { friends: req.params.friendId} },
         { new: true }
      )
      .then((user) => {
         !user
            ? res.status(404).json({ message: 'No user found with that id' })
            : res.json(user);
      })
      .catch((err) => res.json(err));
   }, 
// Get all friends
// getFriends(req, res) {
//    User.findOne({ _id: req.params.userId })
//       .populate({ path: 'friends', select: '-__v' })  
//       .then((dbUserData) => res.json(dbUserData))
      
//       .catch((err) => res.json(err));
// },

   //remove friend
   removeFriend(req, res) {
      User.findOneAndUpdate(
         { _id: req.params.userId },
         { $pull: { friends: req.params.friendId } },
         { new: true }
      )  
      .then((user) => {
        !user
          ? res.status(404).json({ message: 'No user found with that id' })
         : res.json(user);
      })
      .catch((err) => res.json(err));
   }}
