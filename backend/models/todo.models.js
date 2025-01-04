import mongoose from "mongoose";

const  todoSchema=mongoose.Schema({
    text:{
        type:String,
        required:true,
    },
    completed:{
        type:Boolean,
        required:true,
    },
    userbyid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        // required:true,

    }
})

const todo=new mongoose.model("todo",todoSchema);
export default todo;