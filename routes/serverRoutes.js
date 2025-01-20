const express = require('express');
const serverController = require('../controllers/serverController');
const channelController = require('../controllers/channelController')
const router = express.Router();


router.get('/servers', serverController.getUserServers);
router.post('/servers', serverController.createServer);

router.get('/servers/:server_id/channels', serverController.getServerChannels);
router.post('/servers/:server_id/channels', channelController.createChannel);

router.get('/servers/:server_id/members', serverController.getUsers);
router.post('/servers/:server_id/members', serverController.joinUserToServer);

module.exports = router;