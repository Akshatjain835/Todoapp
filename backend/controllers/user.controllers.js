import user from "../models/user.models.js"
import bcrypt from "bcryptjs"

import { generateTokenAndSaveCookies } from "../utils/jwt/token.js";

import { hashPassword } from "../utils/password.js";




// // Register 
export const register=async(req,res)=>{
    console.log("Signup functionc called");
    try {


     const {username,email,password}=req.body;  //here we directly destructure them from frotend
     //const username=req.body.username
     //const email=req.body.email
     //const password=req.body.password we can take them as separate also 

     if(!email || !username || !password){
         return res.status(400).json({errors:"All fields are required"});
     }
     

     // check if user already exist
     const usercheck=await user.findOne({email});
     if(usercheck){
         return res.status(400).json({errors:"User already registered"});  
         //we are doing errors so that all errors are passed into error part  and message display single errors
     }

     //hashing the passworrd
     const hashedpassword=await hashPassword(password);  //hash password
     
     //newuser saving
     const newuser=new user({email,username,password:hashedpassword});
     await newuser.save();

     if(newuser){
        const token=await generateTokenAndSaveCookies(newuser._id,res);
        
        return res.status(201).json({message:"User is registered successfully",newuser,token});
     }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"some error occurred in registering the user"});
        
    }

}


export const login=async(req,res)=>{
    console.log("Login functionc called");
    const {email,password}=req.body;
    try {
        if(!email ||!password){
            return res.status(400).json({message:"All fields are required"});
        }
       
        //checking user exists or not
        const checkuser=await user.findOne({email}).select("+password");
        if(!checkuser || !(await bcrypt.compare(password,checkuser.password))){  //(await bcrypt.compare(password,checkuser.password) this will conmapre the hashed password that is saved in the database
            return res.status(401).json({errors:"Invalid email or password"});
        }


        //generate token for authentication
        //token that is generated is used for authentication and to check whether the user is correct or not and user has not logged in againa gaian and can used the token to visist and we can check without fronted creation whether token generate ios correct or not and we can use jwt.io for checking the user 
        const token=await generateTokenAndSaveCookies(checkuser._id,res);
        res.status(200).json({message:"User logged in successfully",checkuser,token});



    } catch (error) {
        console.log(error);
        res.status(400).json({message:"some error occurred in login"});   
    

    }
}


export const logout=async(req,res)=>{
    console.log("Logout functionc called");
    try {
        //clear cookies
        // res.clearCookie("token"); we can clear this cookie after login and it clears the token geenrsated
        res.clearCookie("jwt",{
            path:"/",
            // httpOnly:true,
            // sameSite:"none",
            // secure:true  //secure:true is used for https only cookies otherwise it will not work on http only cookies and will not work on insecure cookies also on localhost or on other domain name that are not https
        });
        res.status(200).json({message:"User logged out successfully"});
        
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"some error occurred in logout"});
    }
}





