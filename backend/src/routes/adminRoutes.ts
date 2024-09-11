import express from 'express'
import { adminLogin, createUser, deleteUser, getUserInfo, getUsers, logoutAdmin, updateUserInfo } from '../controllers/adminController'
import { admin, protect } from '../middleware/authMiddleware';

const router = express.Router();

//Authentication is only required to login
router.post('/auth',adminLogin);
router.post('/logout',logoutAdmin);

//Have to be protected and only works with authorization
router.get('/getUsers',protect,admin,getUsers);
router.get('/getUserInfo/:id',protect,admin,getUserInfo);
router.post('/updateUserInfo',protect,admin,updateUserInfo);
router.post('/deleteUser/:id',protect,admin,deleteUser);
router.post('/createUser',protect,admin,createUser)


export default router; 