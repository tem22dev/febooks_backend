const jwt = require('jsonwebtoken');
const ms = require('ms');
require('dotenv').config();

const auth = require('../../services/authServices');

class AuthController {
    // [POST]: /register
    async register(req, res) {
        try {
            // Validate data

            // Service register
            const data = await auth.registerService(req.body);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                errMessage: 'Lỗi từ server',
                errCode: 1,
            });
        }
    }

    // [POST]: /login
    async login(req, res) {
        try {
            //Validate data

            // Service login
            const data = await auth.loginService(req.body, res);

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                errMessage: 'Lỗi từ server',
                errCode: 1,
            });
        }
    }

    // [GET]: /account
    async account(req, res) {
        try {
            const authHeader = req.headers['authorization'];
            // console.log(authHeader);
            if (authHeader) {
                // Kiểm tra xem header Authorization có chứa token Bearer không
                const token = authHeader.split(' ')[1];
                req.token = token;
                const validToken = jwt.verify(req.token, process.env.JWT_ACCESS_SECRET);
                const data = await auth.accountService(validToken, req.token);
                return res.status(200).json(data);
            }
        } catch (error) {
            return res.status(401).json({
                errMessage:
                    'Bạn cần Access Token để truy cập API - Unauthorized - (Token hết hạn hoặc không hợp lệ, hoặc không truyền access token)',
                errCode: 1,
                statusCode: 401,
            });
        }
    }

    // [POST]: /logout
    async logout(req, res) {
        try {
            res.clearCookie('refresh_token', '', {
                expires: Date.now(),
            });
            return res.status(200).json({
                errCode: 0,
                message: 'Đăng xuất thành công',
            });
        } catch (error) {
            return res.status(500).json({
                errMessage: 'Lỗi từ server',
                errCode: 1,
            });
        }
    }

    // [GET]: /refresh
    async refresh(req, res) {
        try {
            const refreshToken = req.cookies.refresh_token;
            req.token = refreshToken;
            const validToken = jwt.verify(req.token, process.env.JWT_REFRESH_SECRET);
            const data = await auth.refreshTokenService(validToken);

            return res.status(200).json(data);
        } catch (error) {
            return res.status(400).json({
                errMessage: error,
                errCode: 1,
                statusCode: 400,
            });
        }
    }
}

module.exports = new AuthController();
