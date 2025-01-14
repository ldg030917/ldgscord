//서버에 대한 SQL 쿼리
const pool = require('../utils/db');

/** CREATE: 서버 생성하고 생성한 서버의 id 반환 */
const createServer = async (id, name) => {
    const query = `INSERT INTO server (id, name) VALUE (?, ?)`;
    try {
        const [results] = await pool.query(query, [id, name]);
    } catch (error) {
        throw error;
    }
};

/** READ: 서버 조회 */
const getServerById = () => {
    const query = `SELECT * FROM server`;
};

/** READ: user_id의 서버들에 대해 조회 */
const getUserServers = async (user_id) => {
    const query = `SELECT CONVERT(s.id, CHAR) AS id, s.name FROM server_participant sp JOIN server s ON s.id = sp.server_id WHERE user_id = ?`;
    try {
        const [results] = await pool.query(query, [user_id]);
        return results;
    } catch (error) {
        throw error;
    }
}

/** R: server에 속한 유저 조회 */
const getUsers = async (server_id) => {
    const query = `SELECT user_id AS id FROM server_paricipant WHERE server_id = ?`;
    try {
        const [results] = await pool.query(query, [server_id]);
        return results;
    } catch (error) {
        throw error;
    }
}

/** UPDATE: 서버에 참가자 추가 */
const updateParticipant = async (user_id, server_id) => {
    const query = `INSERT INTO server_participant (user_id, server_id) VALUE (?, ?)`;
    try {
        const [results] = await pool.query(query, [user_id, server_id]);
        return results;
    } catch (error) {
        throw error;
    }
};

const deleteServer = () => {
    const query = `DELETE`;
};

module.exports = { createServer, getServerById, getUserServers, getUsers, updateParticipant };