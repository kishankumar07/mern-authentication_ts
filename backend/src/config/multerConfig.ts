import multer from 'multer'
import fs from 'fs';
import path from 'path';

const uploadPath = path.join(__dirname, '../../public/uploads');

console.log('directory name :',uploadPath)

const storage = multer.diskStorage({
    
    destination(req, file, cb) {
      console.log('entered into multer config file ------------------------------------------------------------------')
        const uploadPath = path.join(__dirname, '../../public/uploads');
        console.log(`uploaded path :${uploadPath}`)
      // Create the directory if it doesn't exist
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename(req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
 
  // Initialize multer with storage and file filter
  const upload = multer({
    storage,
    fileFilter(req, file, cb) {
      const filetypes = /jpeg|jpg|png/;
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = filetypes.test(file.mimetype);
  
      if (extname && mimetype) {
        return cb(null, true);
      } else {
        cb(new Error('Only images are allowed'));
      }
    },
  });

  export default upload;