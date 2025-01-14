const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;
const EXPIRES_IN = "1h";

const generateToken = (payload) => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });
};

const authToken = (req, res, next) => {
    const token = req.headers['authorization']?.replace('Bearer ', '');
    //console.log("AA", req.headers['authorization']);

    if (!token) {
        console.log('Authorization required');
        return res.status(401).json({ message: 'Authorization required' });
    }

    console.log(token);
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
    } catch (error) {
        console.log('Invalid token');
        return res.status(403).json({ message: 'Invalid token' });
    }
    next();
};

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded;
    } catch (error) {
        throw error;
    }
}

module.exports = { generateToken, authToken, verifyToken };