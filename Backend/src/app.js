import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.config.js';
import dotenv from 'dotenv';

//importing routes
import userRoutes from "./routes/user.route.js";
import captainRoutes from "./routes/captain.route.js"

const app = express();
dotenv.config();
connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());


//Basic Route
app.get('/', (req, res) => {
  res.send({message : "Welcome to Uber backend API"});
});


//Implementing Routes
app.use("/api/v1/users" , userRoutes);
app.use("/api/v1/captain" , captainRoutes);

export default app;
