const pool = require('../utils/db');

/** 친구 요청을 보냈을 때 사용 */
const createFriendRequest = async (to_user_id, from_user_id) => {
    const query = `INSERT INTO friend (to_user_id, from_user_id, is_accepted) VALUE (?, ?, 0)`;
    try {
        const [results] = await pool.query(query, [to_user_id, from_user_id]);
        return;
    } catch (error) {
        throw error;
    }
};

/** 친구 요청을 받았을 때 사용 */
const createFriendship = async (to_user_id, from_user_id) => {
    const query = `
        START TRANSACTION;
        UPDATE friend SET is_accepted = TRUE WHERE to_user_id = ? AND from_user_id = ?;
        INSERT INTO friend (to_user_id, from_user_id, is_accepted) VALUE (?, ?, TRUE);
        COMMIT;
    `;
    try {
        await pool.query(query, [to_user_id, from_user_id, to_user_id, from_user_id]);
        return;
    } catch (error) {
        throw error;
    }
}

/** 받은 친구 요청들을 조회 */
const getFriendRequests = async (user_id) => {
    const query = `SELECT from_user_id FROM friend WHERE to_user_id = ? AND is_accepted = FALSE`;
    try {
        const [results] = await pool.query(query, [user_id]);
        return results;
    } catch (error) {
        throw error;
    }

};

/** 보낸 친구 요청들을 조회 */
const getSendFriendRequests = async (user_id) => {
    const query = `SELECT to_user_id FROM friend WHERE from_user_id = ? AND is_accepted = FALSE`;
    try {
        const [results] = await pool.query(query, [user_id]);
        return results;
    } catch (error) {
        throw error;
    }
}

/** 친구들 조회 */
const getFriends = async (user_id) => {
    const query = `SELECT to_user_id id FROM friend WHERE from_user_id = ? AND is_accepted = TRUE`;
    try {
        const [results] = await pool.query(query, [user_id]);
        console.log('friends:', results);
        return results;
    } catch (error) {
        throw error;
    }
};



const deleteFriend = async (user1_id, user2_id) => {
    const query = `DELETE FROM friend WHERE (to_user_id = ? AND from_user_id = ?) OR (to_user_id = ? AND from_user_id = ?)`;
    try {
        const [results] = await pool.query(query, [user1_id, user2_id, user2_id, user1_id]);
    } catch (error) {
        throw error;
    }
};

module.exports = { createFriendRequest, createFriendship, getFriendRequests, getSendFriendRequests, getFriends, deleteFriend };