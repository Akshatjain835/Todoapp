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

     

     }

});

const user=new mongoose.model("user",userSchema);
export default user;