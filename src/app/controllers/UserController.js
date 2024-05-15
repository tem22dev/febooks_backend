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
                return res.status(400).json({ message: 'Không có tập tin nào được tải lên' });
            }
            // Trả về thông tin về file đã được tải lên
            res.json({ message: 'Hình đại diện đã được tải lên thành công', file: req.file });
        } catch (error) {
            return res.status(500).json({
                errMessage: 'Lỗi từ server',
                errCode: 1,
            });
        }
    }

    // [POST]: /import/bulk-create
    async importBulkCreateUser(req, res) {
        try {
            const data = await user.importUserService(req.body);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                errMessage: 'Lỗi từ server',
                errCode: 1,
            });
        }
    }

    // [PUT]: /update
    async updateUser(req, res) {
        try {
            const data = await user.updateUserService(req.body);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                errMessage: 'Lỗi từ server',
                errCode: 1,
            });
        }
    }

    // [DELETE]: /delete/:id
    async deleteUser(req, res) {
        try {
            const authHeader = req.headers['authorization'];
            if (authHeader) {
                // Kiểm tra xem header Authorization có chứa token Bearer không
                const token = authHeader.split(' ')[1];
                const validToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
                const data = await user.deleteUserService(req.params.id, validToken.id);
                return res.status(200).json(data);
            }
        } catch (error) {
            return res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa người dùng' });
        }
    }
}

module.exports = new AuthController();
