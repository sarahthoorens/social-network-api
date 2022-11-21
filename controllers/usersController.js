const { User, Thought } = require('../models');

module.exports = {
  getUser(req, res) {
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
         runValidators: true,
      })
   },
   // Delete a User
   deleteUser(req, res) {
      User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => {
         if (!user) {
            return res.status(404).json({ message: 'No user found with that id' });
         }
         return Thought.deleteMany({ _id: { $in: user.thoughts } });
      }) 
      .then(() => {
         res.json({ message: 'User deleted' });
      })
      .catch((err) => res.status(500).json(err));
   }};
