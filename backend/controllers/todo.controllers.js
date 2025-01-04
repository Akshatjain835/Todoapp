import todo from "../models/todo.models.js"

export const createtodo=async(req,res)=>{
   
    const Todo=new todo({
        text:req.body.text,
        completed:req.body.completed,
        userbyid:req.user._id,  // we are storing user id in database by using req.user.id which is automatically provided by jwt middleware

        
         //here we are getting user id from token which is verified and stored in req.user.id in middleware
    });
  
    

    try {
        const newtodo=await Todo.save();  //async and await is used as database is in another continetn and that is why data is not coming then using asunc and await can help us 
        res.status(201).json({message:"TODO is successfully created",newtodo});
        
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"some error occured in createtodo"})
    }
};

export const gettodos = async (req, res) => {
    try {
        const existTodo = await todo.find({ userbyid:req.user._id }); // fetch todos only for logged-in user
        res.status(201).json({ message: "TODO are successfully fetched", existTodo });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "some error occurred in gettodos" });
    }
};

export const updatetodo = async (req, res) => {
    try {
        const existTodo = await todo.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(201).json({ message: "TODO is successfully updated", existTodo });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "some error occurred in updatetodo" });
    }
};

export const deletetodo = async (req, res) => {
    try {
        const existTodo = await todo.findByIdAndDelete(req.params.id);
        if (!existTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(201).json({ message: "Todo deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Some error occurred in deletetodo" });
    }
};








