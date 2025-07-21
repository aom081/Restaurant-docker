import authController from '../controllers/auth.controller.js';
import express from 'express';
const router = express.Router();
//POST http://localhost:3000/api/auth/register
router.post('/register', authController.register);

export default router;