//사용자에 대한 요청 처리
const userService = require('../services/userService');

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
    const id = req.body.id;
    const password = req.body.password;
    try {
        const token = await userService.loginUser(id, password);
        res.status(200).json({ token: token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { register, login };