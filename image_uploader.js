const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: "public/images",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const accepted_extensions = ["jpg", "png", "jpeg", "gif"];
const UploadImage = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/gif"
    ) {
      return cb(null, true);
    }
    return cb(
      new Error(
        "Only " + accepted_extensions.join(", ") + " files are allowed!"
      )
    );
  },
}).single("image");

module.exports = UploadImage;
