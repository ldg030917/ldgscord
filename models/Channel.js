//채널에 관련된 SQL 쿼리
const pool = require('./../utils/db');



/** CREATE: 채널 생성하고 그 채널의 id를 반환 */
const createChannel = async (id, name, server_id) => {
    const query = `INSERT INTO channel (id, name, server_id) VALUE (?, ?, ?)`;
    try {
        const [results] = await pool.query(query, [id, name, server_id]);
    } catch (error) {
        throw error;
    }
};

/** READ: id에 해당하는 채널의 정보를 반환 */
const getChannelById = async (id) => {
    query = `AA`
    try {
        const [results] = await pool.query(query, []);
        return ;
    } catch (error) {
        throw error;
    }
};

/** READ: 서버의 채널 조회 */
const getServerChannels = async (server_id) => {
    const query = `SELECT CONVERT(c.id, CHAR) AS id, c.name FROM channel c where c.server_id = ?`;
    try {
        const [results] = await pool.query(query, [server_id]);
        //console.log("getServerChannels => ", "server_id: ", server_id, "results: ", results);
        return results;
    } catch (error) {
        throw error;
    }
};

/** UPDATE: id에 해당하는 채널의 이름을 변환 */
const updateChannelName = async (id, name) => {

};

/** DELETE: id에 해당하는 채널을 삭제 */
const deleteChannel = async (id) => {

};

module.exports = { createChannel, getChannelById, getServerChannels, updateChannelName, deleteChannel };