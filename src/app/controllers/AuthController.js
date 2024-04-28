const auth = require('../../services/authServices');

class AuthController {
    // [POST]: /register
    async register(req, res) {
        try {
            // Validate data

            // Service register
            const data = await auth.registerService(req.body.values);
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
