import { z } from "zod";
import jwt from "jsonwebtoken"


export const validate = (schema) => (req, res, next) => {
  const validationResult = schema.safeParse(req.body);

  
 // const validationResult=userSchema.safeParse({username,email,password});//for validation creation and check  // we have provided this {username,email,password} and also we can give req.body //but we have to specify which field to parse and check in {}
 //  if(validationResult.error){ //!validationResult.success
 //      return res.status(400).json({message:validationResult.error.message});
 //  }  
  if (!validationResult.success) {
    const errors = validationResult.error.errors.map((err) => err.message);
    return res.status(400).json({ errors });
  }
  next();
};

// Validation schema for user registration
export const userSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  username: z.string().min(3, { message: "Username should be at least 3 characters long" }).max(20),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }).max(20),
});
