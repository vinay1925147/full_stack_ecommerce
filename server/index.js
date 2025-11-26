import express from "express";
import mongoose from "mongoose";
import authRoute from './routes/auth/auth-route.js';
import adminRoute from './routes/admin/product-route.js'
import shopRoute from './routes/shop/product-route.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app = express();
const port = 8000;

import dotenv from "dotenv";
dotenv.config();

 
mongoose
  .connect(
    "mongodb+srv://vinayasati5_db_user:Vinay%40123@cluster0.4dg2kip.mongodb.net/yourDBname"
  )
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.error("mongo error:", err);
  });

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use("/api/auth", authRoute);
app.use("/api/admin/product",adminRoute);
app.use("/api/shop/product",shopRoute);

app.listen(port, () => {
  console.log("server is started");
});
