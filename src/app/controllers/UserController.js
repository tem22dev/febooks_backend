const jwt = require('jsonwebtoken');
const ms = require('ms');
require('dotenv').config();

const user = require('../../services/userServices');

class AuthController {
    // [GET]: /
    async getAllUser(req, res) {
        try {
            const data = await user.getAllUserService();
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                errMessage: 'Lỗi từ server',
                errCode: 1,
            });
        }
    }
}

module.exports = new AuthController();
