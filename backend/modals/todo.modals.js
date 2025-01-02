import mongoose from "mongoose";

const  todoSchema=mongoose.Schema({
    text:{
        type:String,
        required:true,
    },
    completed:{
        type:Boolean,
        requried:true,
    },
})

const todo=new mongoose.model("todo",todoSchema);
export default todo;