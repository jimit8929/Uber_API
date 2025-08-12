import express from 'express';
import {body} from 'express-validator';
import { registerValidator } from '../validators/user.validators.js';
import { registerUser } from '../controllers/user.controller.js';

const router = express.Router();

router.post("/register", registerValidator , registerUser)


// router.post("/login",);


// router.get("/profile",);


// router.get("/logout",);

export default router;