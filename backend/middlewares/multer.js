import multer from "multer";

const storage = multer.memoryStorage();
export const singleUpload = multer({ storage }).single("avatar");

export const uploadMultiple = multer({ storage }).array("productImage", 5);
