import multer from "multer";
import path from "path";
import fs from "fs";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(process.cwd(), "uploads");
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}-${Math.round(Math.random()*1e9)}${ext}`);
    }
});
const filefilter = (req, file, cb) =>{
    // allow images only
    if (file.mimetype.startswith("image/")) cb(null, true);
    else cb(new Error("only images allowed"), false);
};

export const upload = multer({ storage, fileFilter, limits: {fileSize: 5 * 1024 * 1024}});