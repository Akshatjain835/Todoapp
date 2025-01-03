import express from "express"
import dotenv from "dotenv"
import todoroute from "./routes/todo.routes.js"
import userroute from "./routes/user.routes.js"
import connectDB from "./config/db.js";
import { errorHandler } from "./middleware/errorhandler.middleware.js";
import cookieParser from "cookie-parser";
import cors from "cors"


dotenv.config();//for using .env

const app=express();    
const port=process.env.PORT;



//database connection
connectDB();

//middleware
app.use(express.json());//as body data is comintg in raw format and we have to make it in json format that is why express.json is done
app.use(cookieParser());
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,  //that is backend has to accept the request coming from the above origin  or frontend
    methods:"GET,   POST, PUT, DELETE, OPTIONS",
    allowedHeaders:["Authorization,Content-Type"]  //Content-Type is specified because we are fetching json type from the server
}));  //for connecting the frontend and backend  //we have specified origin so that the backend accepts only the url coming from frontend speccife   at process.env.FRONTEND_URL



// routes
app.use("/todo",todoroute);
app.use("/user",userroute);


// Error handling middleware
app.use(errorHandler);


//start the server
app.listen(port,()=>{
    console.log(`app is listening at port ${port}`);
})