import multer from "multer";
import os from "os";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, os.tmpdir())  // uses system temp folder, outside your project
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
  
export const upload = multer({ 
    storage, 
})