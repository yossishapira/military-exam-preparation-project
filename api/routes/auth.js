import {login,me} from '../controllers/authController.js';
import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
const router = Router();

router.post('/login',login);
router.get('/me',requireAuth,me)

export default router;
