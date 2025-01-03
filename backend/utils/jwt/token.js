import jwt from "jsonwebtoken"
import user from "../../models/user.models.js"

export const generateTokenAndSaveCookies=async(userId,res)=>{
    // Generate JWT token
    // const token=generateToken(req.user); 
    //jwt.sign({userId},token)

   const token= jwt.sign({userId},process.env.JWT_SECRET_KEY,{
        expiresIn:"1h",
    });
    res.cookie("jwt",token,{
        httpOnly:true,
        expires:new Date(Date.now()+1*60*60*1000),  //1 hour //expiresIn:"1h"
        sameSite:"lax",
        secure:false,
        path:"/"
    })

    await user.findByIdAndUpdate(userId,{token});
    return token;
}


export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};