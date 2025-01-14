//채널 관련 api 경로 정의
const express = require('express');
const channelController = require('../controllers/channelController');
const router = express.Router();

router.get('/channels/:channel_id/messages', channelController.getChannelMessages);
router.post('/channels/:channel_id/messages', channelController.createMessage);

module.exports = router;