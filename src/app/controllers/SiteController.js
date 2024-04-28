class SiteController {
    // [GET] /accounts
    index(req, res) {
        return res.json([{}]);
    }
}

module.exports = new SiteController();
