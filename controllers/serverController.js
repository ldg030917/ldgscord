const serverService = require('../services/serverService');
const channelService = require('../services/channelService');
const userService = require('../services/userService');

const createServer = async (req, res) => {
    const user_id = req.user.id;
    const name = req.body.name;
    try {
        const server_id = await serverService.createServer(name);
        const result = await serverService.joinUserToServer(user_id, server_id);
        const channel_id = await channelService.createChannel('일반', server_id);
        res.status(200).json({ server_id: server_id, channel_id: channel_id });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}

const getServerById = async (req, res) => {
    const server_id = req.params.server_id;
    
}

/** 유저가 속한 서버 id 리스트 찾기 */
const getUserServers = async (req, res) => {
    const user_id = req.user.id;
    console.log(user_id);
    try {
        const servers = await serverService.getUserServers(user_id);
        res.status(200).json({ servers: servers });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

/** 서버에 포함된 채널 id 리스트 찾기 */
const getServerChannels = async (req, res) => {
    const server_id = req.params.server_id;
    console.log("server_id: ", server_id);
    try {
        const channels = await serverService.getChannels(server_id);
        res.status(200).json({ channels: channels });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

/** 서버에 속한 사용자 리스트 */
const getUsers = async (req, res) => {
    const server_id = req.params.server_id;
    try {
        const users = serverService.getUsers(server_id);
        res.status(200).json({ users: users });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const joinUserToServer = async (req, res) => {
    const server_id = req.params.server_id;
    const user_id = req.user.id;
    try {
        const result = serverService.joinUserToServer(user_id, server_id);
        res.status(200).json({});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { createServer, getServerById, getUserServers, getServerChannels, getUsers, joinUserToServer };