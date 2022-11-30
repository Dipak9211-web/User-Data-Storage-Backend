import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import authRoutes from './routes/auth.js'
import userDataRoutes from './routes/userdata.js'

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());


//DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB ERROR => ", err));
app.get("/", (req, res)=>{
    res.json({message:"hello world"})
})

// router middleware
app.use("/api", authRoutes);
app.use("/api", userDataRoutes);



app.listen(port, () => {
  console.log(`Node server is running on port ${port}`);
});

