const cate = require('../../services/cateServices');

class CateController {
    // [GET]: /cate/author
    async getAllAuthor(req, res) {
        try {
            const data = await cate.getAuthorService();
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                errMessage: 'Lỗi từ server',
                errCode: 1,
            });
        }
    }

    // [GET]: /cate/genre
    async getAllGenre(req, res) {
        try {
            const data = await cate.getGenreService();
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                errMessage: 'Lỗi từ server',
                errCode: 1,
            });
        }
    }

    // [GET]: /cate/publisher
    async getAllPublisher(req, res) {
        try {
            const data = await cate.getPublisherService();
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                errMessage: 'Lỗi từ server',
                errCode: 1,
            });
        }
    }

    // [GET]: /cate/supplier
    async getAllSupplier(req, res) {
        try {
            const data = await cate.getSupplierService();
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                errMessage: 'Lỗi từ server',
                errCode: 1,
            });
        }
    }

    // [GET]: /cate/language
    async getAllLanguage(req, res) {
        try {
            const data = await cate.getLanguageService();
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                errMessage: 'Lỗi từ server',
                errCode: 1,
            });
        }
    }
}

module.exports = new CateController();
