const jwt = require('jsonwebtoken');
require('dotenv').config();

const order = require('../../services/orderServices');

class OrderController {
    // [POST]: /
    async createOrder(req, res) {
        try {
            const data = await order.createOrderService(req.body);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                errMessage: 'Lỗi từ server',
                errCode: 1,
            });
        }
    }

    // [GET]: /history
    async getHistory(req, res) {
        try {
            const authHeader = req.headers['authorization'];
            if (authHeader) {
                // Kiểm tra xem header Authorization có chứa token Bearer không
                const token = authHeader.split(' ')[1];
                const validToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
                const data = await order.getHistoryService(validToken.id);
                return res.status(200).json(data);
            }
        } catch (error) {
            return res.status(500).json({
                errMessage: 'Lỗi từ server',
                errCode: 1,
            });
        }
    }
}

module.exports = new OrderController();
