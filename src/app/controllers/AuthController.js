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
            const data = await auth.loginService(req.body);
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
