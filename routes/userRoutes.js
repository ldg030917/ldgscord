const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/friends', userController.getFriends);

//router.get('/friends/requests', userController);
router.post('/friends/requests', userController.sendFriendRequest);
//router.pos;

module.exports = router;