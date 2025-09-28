import express from 'express';
import { sendTestEmail, register, verify } from '../controllers/registration.controller.js';

const router = express.Router();

router.get('/', sendTestEmail);
router.post('/register', register);
router.post('/verify', verify);

export default router;