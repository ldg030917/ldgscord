//사용자 처리에 대한 비즈니스 로직
const userModel = require('../models/User');
const friendModel = require('../models/Friend');
const bcrypt = require('bcrypt');
const { generateToken, verifyToken } = require('../utils/jwt');

const registerUser = async (id, password, nickname, email) => {
    if (!id || !password || !email) {
        throw new Error('All fields are required');
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await userModel.createUser(id, hashedPassword, nickname, email);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const loginUser = async (id, password) => {
    try {
        const user = await userModel.getUserById(id);
        console.log(`p:${password} up:{user.password}`);
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            console.log("login success");
            return generateToken({ id });
        } else {
            console.log("login failed");
            throw new Error('EEEE');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = { registerUser, loginUser };