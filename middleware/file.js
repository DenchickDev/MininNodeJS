const multer = require('multer');
// test2
const storage = multer.diskStorage({
    // куда будем складывать файл
    destination(req, file, cb) {
        cb(null, 'images')
    },
    // здесь переименовываем файл
    filename(req, file, cb) {
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
});

const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg']

const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false);
    }
};

module.exports = multer({
    storage,
    fileFilter
})