const multer = require("multer");

// Setup Multer handle PDF Upload
exports.handlePdfUpload = () => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "./files");
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now();
            // const uniqueSuffix = new Date().toLocaleDateString().replace(/\//g, '-');
            cb(null, uniqueSuffix + file.originalname);
        },
    });

    const upload = multer({ storage: storage });

    // return upload.single("resume"); // for only one file upload
    
    // for more than one one file upload here maximum "2" as specified
    return upload.fields([
        { name: 'resume', maxCount: 1 }, 
        { name: 'coverLetter', maxCount: 1 }
    ]);
}