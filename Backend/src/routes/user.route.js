import express from 'express';
import {body} from 'express-validator';
import { loginValidator, registerValidator } from '../validators/user.validators.js';
import { loginUser, registerUser } from '../controllers/user.controller.js';

const router = express.Router();

router.post("/register", registerValidator , registerUser)


router.post("/login", loginValidator , loginUser);


// router.get("/profile",);


// router.get("/logout",);

export default router;