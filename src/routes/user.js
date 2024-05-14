const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const userController = require('../app/controllers/UserController');

// Thiết lập multer cho việc upload file avatar
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(__dirname);
        console.log(path);
        cb(null, path.join(__dirname, '..', 'public', 'images', 'accounts'));
    },
    filename: function (req, file, cb) {
        // Đặt tên file mới dựa trên thời gian upload và extension của file
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage: storage });

router.post('/upload/avatar', upload.single('avatar'), userController.uploadAvatarUser);
router.post('/import/bulk-create', userController.importBulkCreateUser);
router.get('/search', userController.searchUser);
router.post('/create', userController.createUser);
router.get('/', userController.getAllUser);

module.exports = router;
