import mongoose from "mongoose";

const userSchema=mongoose.Schema({
     username:{
        type:String,
        required:true
     },
     email:{
        type:String,
        required:true,
        unique:true,
     },
     password:{
        type:String,
        required:true,
        select:false
     },
     token:{
      type:String,

      expiresIn: "1h" ,//token will expire after 1 hour

     }

});

const user=new mongoose.model("user",userSchema);
export default user;