const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const path = `client/public/static/images/recipes`;
        fs.access(path, error => {
            if (error) return fs.mkdir(path, { recursive: true }, error => cb(error, path))
            else cb(null, path);
        });
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + '-' + file.originalname )
    }
});

const types = ['image/jpeg', 'image/png', 'image/jpg'];

const fileFilter = (req, file, cb) => {
    if (types.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

module.exports = multer({ 
    storage: storage,
    // limits: {
    //     fileSize: 1024 * 1024 * 100
    // },
    fileFilter: fileFilter,
});
