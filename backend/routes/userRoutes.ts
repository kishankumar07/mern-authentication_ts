import express from 'express'
const router = express.Router();
import { authUser,registerUser,logoutUser,getUserProfile,updateUserProfile } from '../controllers/userController.ts';

router.post('/auth',authUser);
router.post('/',registerUser)
router.post('/logout',logoutUser);
// router.get('/profile',getUserProfile)
// router.put('/profile',updateUserProfile);
router.route('/profile').get(getUserProfile).put(updateUserProfile);

export default router;