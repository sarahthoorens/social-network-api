const { User, Thought, Reactions } = require('../models');

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with that id' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'thought created, but no users with this ID' })
          : res.json({ message: 'thought created' })
      )
      .catch((err) => {
        console.error(err);
      });
  },
  updateThought(req, res) {
   Thought.findOneAndUpdate(
     { _id: req.params.thoughtId },
     { $set: req.body },
     { runValidators: true, new: true }
   )
     .then((thought) =>
       !thought
         ? res.status(404).json({ message: 'No thought with this id!' })
         : res.json(thought)
     )
     .catch((err) => {
       console.log(err);
       res.status(500).json(err);
     });
 },
 deleteThought(req, res) {
   Thought.findOneAndRemove({ _id: req.params.thoughtId })
     .then((thought) =>
       !thought
         ? res.status(404).json({ message: 'No thought with this id!' })
         : User.findOneAndUpdate(
             { thoughts: req.params.thoughtId },
             { $pull: { thoughts: req.params.thoughtId } },
             { new: true }
           )
     )
     .then((user) =>
       !user
         ? res
             .status(404)
             .json({ message: 'Thought created but no user with this id!' })
         : res.json({ message: 'Thought successfully deleted!' })
     )
     .catch((err) => res.status(500).json(err));
 },
   // Add a reaction
   addReaction(req, res) {
      Thought.findOneAndUpdate(
         { _id: req.params.thoughtId },
         { $push: { reactions: req.body } },
         { new: true, runValidators: true }
      )
         .then((thought) =>
         !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought)
         )
         .catch((err) => res.status(500).json(err));
   },
   // Delete a reaction
   removeReaction(req, res) {
      Thought.findOneAndUpdate(
         { _id: req.params.thoughtId },
         { $pull: { reactions: { reactionId: req.params.reactionId } } },
         { new: true }
      )
         .then((thought) =>
         !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought)
         )
         .catch((err) => res.status(500).json(err));
   }
};

