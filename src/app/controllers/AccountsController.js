const db = require('../models');

class AccountsController {
    // [GET] /accounts
    async index(req, res) {
        try {
            const data = await db.User.findAll();
            return res.json(data);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new AccountsController();
