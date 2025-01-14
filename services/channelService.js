const channelModel = require('../models/Channel');
const messageModel = require('../models/Message');
const Snowflake = require('../utils/snowflake');
const snowflake = new Snowflake();

const createChannel = async (name, server_id) => {
    const id = snowflake.generateID();
    try {
        await channelModel.createChannel(id, name, server_id);
        return id.toString();
    } catch (error) {
        throw error;
    }
}

const getChannelMessages = async (channel_id) => {
    try {
        const messages = await messageModel.getMessages(channel_id);
        console.log('msgs: ', messages);
        return messages;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const createMessage = async (channel_id, user_id, content) => {
    try {
        await messageModel.createMessages(channel_id, user_id, content);
        return;
    } catch (error) {
        throw error
    }
}

module.exports = { createChannel, getChannelMessages, createMessage };