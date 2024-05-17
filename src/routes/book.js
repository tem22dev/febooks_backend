const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const bookController = require('../app/controllers/BookController');

// Thiết lập multer cho việc upload file avatar
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'public', 'images', 'accounts'));
    },
    filename: function (req, file, cb) {
        // Đặt tên file mới dựa trên thời gian upload và extension của file
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage: storage });

// router.post('/upload/avatar', upload.single('avatar'), bookController.uploadAvatarUser);
// router.post('/import/bulk-create', bookController.importBulkCreateUser);
// router.delete('/delete/:id', bookController.deleteUser);
router.get('/search', bookController.searchBook);
// router.put('/update', bookController.updateUser);
// router.post('/create', bookController.createUser);
router.get('/', bookController.getAllBook);

module.exports = router;
