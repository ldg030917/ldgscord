const express = require('express');
const serverController = require('../controllers/serverController');
const router = express.Router();


router.get('/servers', serverController.getUserServers);
router.post('/servers', serverController.createServer);

router.get('/servers/:server_id/channels', serverController.getServerChannels);
//router.get('/servers/:server_id/channels');

module.exports = router;