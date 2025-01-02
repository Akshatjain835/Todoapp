import express from "express"
import { register,login,logout } from "../controllers/user.controllers.js";

const router=express.Router();

router.post("/signup",register);
router.post("/login",login);
router.get("/logout",logout);

export default router;