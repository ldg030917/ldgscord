const pool = require('../utils/db');

/** CREATE: 새로운 유저를 생성하고 아무것도 반환하지 않음 */
const createUser = async (id, password, nickname, email) => {
    const query = `INSERT INTO user_account (id, password, nickname, email) VALUES(?,?,?,?)`;
    try {
        const [results] = await pool.query(query, [id, password, nickname, email]);
        return;
    } catch (error) {
        throw error;
    }
};

/** READ: id를 가진 유저 조회 */
const getUserById = async (id) => {
    const query = `SELECT * FROM user_account WHERE id = ?`;
    console.log(id);
    try {
        const [results] = await pool.query(query, [id]);
        //console.log(results[0]);
        return results[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const updateUser = async () => {
    const query = ``;
    try {
        
    } catch (error) {
        
    }
}

/** DELETE: id에 해당하는 유저 삭제 */
const deleteUser = async (id) => {
    const query = ``;
    try {
        const [results] = await pool.query(query, [id]);
    } catch (error) {
        
    }
}


module.exports = {createUser, getUserById, updateUser, deleteUser};