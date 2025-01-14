const pool = require('./../utils/db');

const createMessages = async (channel_id, user_id, content) => {
    const query = `INSERT INTO message (channel_id, user_id, content) VALUE (?, ?, ?)`;
    try {
        await pool.query(query, [channel_id, user_id, content]);
        return;
    } catch (error) {
        throw error;
    }
}

const getMessages = async (channel_id) => {
    const query = `
        SELECT * FROM (
            SELECT *
            FROM message 
            WHERE channel_id = ? 
            ORDER BY created_at DESC 
            LIMIT 50
        ) AS recent_messages
        ORDER BY created_at ASC`;
    try {
        const [results] = await pool.query(query, [channel_id]);
        return results;
    } catch (error) {
        throw error;
    }
};

module.exports = { createMessages, getMessages };