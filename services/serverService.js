const serverModel = require('../models/Server');
const channelModel = require('../models/Channel');
const Snowflake = require('../utils/snowflake');
const snowflake = new Snowflake();

const createServer = async (name) => {
    const id = snowflake.generateID();
    try {
        await serverModel.createServer(id, name);
        return id.toString();
    } catch (error) {
        throw error;
    }
}

const getServerById = async () => {

}

/** user id를 입력받고 그 유저가 속해있는 서버 id들을 반환 */
const getUserServers = async (user_id) => {
    try {
        const servers = await serverModel.getUserServers(user_id);
        console.log("servers: ", servers);
        return servers;
    } catch (error) {
        console.error("getServersList", error);
        throw error;
    }
}

/** server_id에 해당하는 서버의 채널들의 id 조회 */
const getChannels = async (server_id) => {
    try {
        const channels = await channelModel.getServerChannels(server_id);
        return channels;
    } catch (error) {
        throw error;
    }
}

const joinUserToServer = async (user_id, server_id) => {
    try {
        const result = await serverModel.updateParticipant(user_id, server_id);
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = { createServer, getServerById, getUserServers, getChannels, joinUserToServer }