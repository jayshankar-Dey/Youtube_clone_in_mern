/* eslint-disable no-undef */
const multer = require('multer')


const storage = multer.memoryStorage()



const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/webp') {
        cb(null, true);
    } else {
        cb({ message: 'Unsupported File Format' }, false)
    }
};

const fileFilterVideo = (req, file, cb) => {
    if (file.mimetype === 'video/mp4') {
        cb(null, true);
    } else {
        cb({ message: 'Unsupported File Format' }, false)
    }
};


const uploadImage = multer({
    storage: storage,
    limits: { fileSize: 4096 * 4096 },
    fileFilter: fileFilter
});

const uploadVideo = multer({
    storage: storage,
    fileFilter: fileFilterVideo
});

module.exports = { uploadImage, uploadVideo };