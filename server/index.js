require("dotenv").config();
const express=require('express');
const connection= require("./db");
const app=express();
const authRoute=require("./routes/auth.js");
const hotelsRoute=require("./routes/hotels");
const userRoute=require("./routes/user");
const roomsRoute=require("./routes/rooms");
const cookieParser=require('cookie-parser');
const cors = require('cors')

connection()

app.get("/",(req,res)=>{
    res.send("hello first request")
})

//middlewares

app.use(cookieParser())
app.use(express.json())

app.use(cors());

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
//     next();
//   });
  
// app.use((req, res, next) => {
//     const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000'];
//     const origin = req.headers.origin;
//     if (allowedOrigins.includes(origin)) {
//       res.header('Access-Control-Allow-Origin', origin);
//     }
//     next();
//   });
  
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  next();
});


app.use("/auth",authRoute)
app.use("/hotels",hotelsRoute)
app.use("/users",userRoute)
app.use("/rooms",roomsRoute)



app.use((err,req,res,next)=>{
    const errorStatus=err.status||500
    const errorMessage=err.message||"something went wrong"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack,
    })
})

const port=process.env.PORT||8800;
app.listen(port,console.log(`listening on port ${port}...`))