const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
  // getFriends,
} = require('../../controllers/userController');

// /api/users
router.route('/')
.get(getUsers)
.post(createUser);

// /api/users/:userId
router.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

// /api/thoughts/:thoughtId/reactions
router.route('/:userId/friends').post(addFriend);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:userId/friends/friendId').delete(removeFriend);


module.exports = router;
