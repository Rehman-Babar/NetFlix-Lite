import express from 'express';
import { GetMe, Login, Logout, Signup } from '../controllers/authControllers.js';
import { protectedRoutes } from '../middlewares/protectedRoutes.js';

const router = express.Router();

router.get('/me',protectedRoutes, GetMe)
router.post('/signup', Signup)
router.post('/login', Login)
router.post('/logout', Logout)

export default router