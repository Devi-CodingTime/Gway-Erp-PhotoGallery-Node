import multer from "multer";
import path from "path";

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

// Filter for only images
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed (.jpg, .jpeg, .png)"));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;





// config/multer.js
// import multer from "multer";
// import path from "path";
// import fs from "fs";

// // Create upload directory if it doesn't exist
// const uploadDir = "uploads";
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + file.originalname;
//     cb(null, uniqueSuffix);
//   },
// });

// export const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     if (![".png", ".jpg", ".jpeg", ".webp"].includes(ext.toLowerCase())) {
//       return cb(new Error("Only images are allowed"));
//     }
//     cb(null, true);
//   },
// });
