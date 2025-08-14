import express from 'express';
import {body} from 'express-validator';
import { loginValidator, registerValidator } from '../validators/user.validators.js';
import { getUserProfile, loginUser, logoutUser, registerUser } from '../controllers/user.controller.js';
import { authUser } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/register", registerValidator , registerUser)


router.post("/login", loginValidator , loginUser);


router.get("/profile", authUser , getUserProfile);


router.get("/logout", authUser , logoutUser);

export default router;