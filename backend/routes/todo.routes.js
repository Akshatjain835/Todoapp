import express from "express"
import { createtodo, deletetodo, gettodos, updatetodo } from "../controllers/todo.controllers.js";
import { authenticate } from "../middleware/authentication.middleware.js";


const router=express.Router();



router.post("/create",authenticate,createtodo);
router.get("/fetch",authenticate,gettodos);
router.put("/update/:id",updatetodo);
router.delete("/delete/:id",deletetodo);

export default router;
