import todo from "../models/todo.models.js"

export const createtodo=async(req,res)=>{

    const Todo=new todo({
        text:req.body.text,
        completed:req.body.completed,
    });
    // const { text, completed } = req.body;

    // Validate input
    // if (!text || typeof completed !== "boolean") {
    //     return res.status(400).json({ message: "Invalid input data" });
    // }

    // const newTodo = new Todo({ text, completed });

    try {
        const newtodo=await Todo.save();  //async and await is used as database is in another continetn and that is why data is not coming then using asunc and await can help us 
        res.status(201).json({message:"TODO is successfully created",newtodo});
        
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"some error occured in createtodo"})
    }
};

export const gettodos=async(req,res)=>{
    try {
         const existTodo=await todo.find();
         res.status(201).json({message:"TODO are successfully dfeteched",existTodo});
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"some error occured in gettodo"})
    }
};

export const updatetodo=async(req,res)=>{
    try {
        const existTodo=await todo.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
        })
        res.status(201).json({message:"TODO are successfully updatedd",existTodo});
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"some error occured in updatedtodo"})
    }
};

export const deletetodo=async(req,res)=>{
     try {
         const existTodo=await todo.findByIdAndDelete(req.params.id);
         if(!existTodo){
            return res.status(404).json({message:"Todo not exist"});
         }
         res.status(201).json({message:"Todo deleted successfully"});

     } catch (error) {
        console.log(error);
        res.status(400).json({message:"Some error occurred in deletetodo "});
     }
}