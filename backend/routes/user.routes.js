import express from "express"
import { register,login,logout } from "../controllers/user.controllers.js";
import { userSchema, validate } from "../middleware/validation.middleware.js";
import { authenticate } from "../middleware/authentication.middleware.js";

const router=express.Router();


router.use(authenticate);

router.post("/signup",validate(userSchema),register);
router.post("/login",login);
router.get("/logout",authenticate,logout);

export default router;