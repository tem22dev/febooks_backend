class AccountsController {
    // [GET] /accounts
    index(req, res) {
        res.send('Accounts');
    }
}

module.exports = new AccountsController();
