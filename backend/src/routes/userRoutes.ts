import express from 'express'
const router = express.Router();
import { authUser,registerUser,logoutUser,getUserProfile,updateUserProfile } from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';

router.post('/auth',authUser);
router.post('/',registerUser)
router.post('/logout',logoutUser);
// router.get('/profile',getUserProfile)
// router.put('/profile',updateUserProfile);
router
.route('/profile')
.get(protect,getUserProfile)
.put(protect,updateUserProfile);

export default router; 