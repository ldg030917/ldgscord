//사용자에 대한 요청 처리
const userService = require('../services/userService');
const friendModel = require('../models/Friend');

const register = async (req, res) => {
    const id = req.body.id;
    const password = req.body.password;
    const nickname = req.body.nickname;
    const email = req.body.email;
    try {
        const isRegistered = await userService.registerUser(id, password, nickname, email);
        if (isRegistered) {
            res.status(200).json({ message: "성공"});
        } else {
            res.status(400).json({ message: "실패"});
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    console.log("Request Body:", req.body);
    const id = req.body.id;
    const password = req.body.password;
    try {
        const token = await userService.loginUser(id, password);
        res.status(200).json({ token: token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const sendFriendRequest = async (req, res) => {
    const id = req.user.id;
    const to_user_id = req.body.id;
    try {
        await friendModel.createFriendRequest(to_user_id, id, 0);
        res.status(200).json({});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const acceptFriendRequest = async (req, res) => {
    const id = req.user.id;
    const from_user_id = req.body.id;
    try {
        await friendModel.createFriendship(id, from_user_id);
        //dm용 채널 하나 만들기
        res.status(200).json({});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getFriends = async (req, res) => {
    const id = req.user.id;
    try {
        const friends = await friendModel.getFriends(id);
        res.status(200).json({ friends: friends });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { register, login, getFriends, sendFriendRequest, acceptFriendRequest };