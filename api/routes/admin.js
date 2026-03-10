import { Router } from "express";
import { requireAuth ,isAdmin} from '../middleware/auth.js';
import { listUsers,createUser } from "../controllers/adminController.js";

const router = Router();

router.use(requireAuth, isAdmin);

router.post('/register',createUser);
router.get('/users',listUsers)

export default router;