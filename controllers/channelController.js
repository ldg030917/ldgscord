const channelService = require('../services/channelService');

const createChannel = async (req, res) => {
    const server_id = req.params.server_id;
    const channel_name = req.body.name;
    try {
        const channel_id = await channelService.createChannel(channel_name, server_id);
        res.status(200).json({ channelId: channel_id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getChannelMessages = async (req, res) => {
    const channel_id = req.params.channel_id;
    try {
        const messages = await channelService.getChannelMessages(channel_id);
        res.status(200).json({ messages: messages });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const createMessage = async (req, res) => {
    const channel_id = req.params.channel_id;
    const user_id = req.user.id;
    const content = req.body.content;
    //console.log(channel_id, user_id, content);
    try {
        await channelService.createMessage(channel_id, user_id, content);
        res.status(200).json();
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

module.exports = { createChannel, getChannelMessages, createMessage };