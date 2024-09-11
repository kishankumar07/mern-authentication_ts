import express from 'express'
const router = express.Router();
import { authUser,registerUser,logoutUser,getUserProfile,updateUserProfile } from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';
import upload from '../config/multerConfig';

router.post('/auth',authUser);
router.post('/',registerUser)
router.post('/logout',logoutUser);
// router.get('/profile',getUserProfile)
// router.put('/profile',updateUserProfile);
router
.route('/profile')
.get(protect,getUserProfile)
.put(protect,upload.single('profileImage'),updateUserProfile);

export default router; 