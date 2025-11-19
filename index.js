import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";


dotenv.config();
const app = express();
app.use(express.json());



//connection of database  == MongoDB
connectDB();
//mongoose.connect(process.env.MONGO_URI)
  //  .then(() => console.log("Connected to local MongoDB"))
  //  .catch(err => console.log("Mongo DB connection error", err))
//;
// Routes
import productRoutes from "./routes/productRoutes.js";

app.use("/api/products", productRoutes);


app.listen(5000, () => console.log("Server running on port 5000"));