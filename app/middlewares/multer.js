import multer from "multer";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const uploadPath = path.resolve(__dirname, "../..", "public/uploads");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Math.floor(Math.random() * 99999999) + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === `image/jpeg` ||
    file.mimetype === `image/png` ||
    file.mimetype === `image/jpg` ||
    file.mimetype === `image/svg+xml`
  ) {
    cb(null, true);
  } else {
    cb(
      {
        message: "Unsupported file format",
      },
      false
    );
  }
};

const uploadMiddleware = multer({
  storage,
  limits: {
    fileSize: 5000000,
  },
  fileFilter,
});

export default uploadMiddleware;
