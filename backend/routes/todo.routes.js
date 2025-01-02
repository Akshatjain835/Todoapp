import express from "express"
import { createtodo, deletetodo, gettodos, updatetodo } from "../controllers/todo.controllers.js";


const router=express.Router();

router.post("/create",createtodo);
router.get("/fetch",gettodos);
router.put("/update/:id",updatetodo);
router.delete("/delete/:id",deletetodo);

export default router;
