import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"

import todoroute from "./routes/todo.routes.js"
import userroute from "./routes/user.routes.js"


dotenv.config();

const app=express();
const port=process.env.PORT;
const MONGODB_URL=process.env.MONGODB_URL;


//database connection
try {
    await mongoose.connect(MONGODB_URL);
    console.log("connected to mongodb");
} catch (error) {
       console.log(error);
    
}

//creattodo route
app.use(express.json());//as body data is comintg in raw format and we have to make it in json format that is why express.json is done
app.use("/todo",todoroute);
app.use("/user",userroute);

app.listen(port,()=>{
    console.log(`app is listening at port ${port}`);
})