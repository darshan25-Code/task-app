const express = require('express')
const connectDB = require('./config/db')
require('dotenv').config()
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require('./routes/taskRoutes')
const cookieParser = require('cookie-parser')
const cors = require("cors");

const app = express()
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use('/api/auth',authRoutes)
app.use('/api/tasks',taskRoutes)

connectDB()

app.get("/", (req, res) => {
  res.send("Task Manager App is Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server is Running on ${PORT}`);
    
})