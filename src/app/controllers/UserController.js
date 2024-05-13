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

    // [GET]: /search
    async searchUser(req, res) {
        try {
            const data = await user.searchUserService(req.query);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                errMessage: 'Lỗi từ server',
                errCode: 1,
            });
        }
    }

    // [POST]: /create
    async createUser(req, res) {
        try {
            const data = await user.createUserService(req.body);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                errMessage: 'Lỗi từ server',
                errCode: 1,
            });
        }
    }

    // [POST]: /upload/avatar
    async uploadAvatarUser(req, res) {
        try {
            // Nếu không có file được tải lên, trả về lỗi
            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }
            // Trả về thông tin về file đã được tải lên
            res.json({ message: 'Avatar uploaded successfully', file: req.file });

            // const data = await user.searchUserService(req.query);
            // return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                errMessage: 'Lỗi từ server',
                errCode: 1,
            });
        }
    }
}

module.exports = new AuthController();
