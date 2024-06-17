import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';

import connectToMongoDB from "./db/connectToMonogoDB.js";
 
const app=express();
const port = process.env.PORT || 5000;

dotenv.config();

app.use(express.json());
app.use(cookieParser())

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/Users",userRoutes);

app.listen(port,()=>{
    connectToMongoDB();
    console.log(" Server Running");
});