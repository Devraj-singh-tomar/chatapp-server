import multer from "multer";

const multerUpload = multer({
  limits: {
    fieldSize: 1024 * 1024 * 5, // 5MB
  },
});

const singleAvatar = multerUpload.single("avatar");

export { multerUpload, singleAvatar };
