import user from "../modals/user.modals.js"

export const register=async(req,res)=>{
    console.log("Signup functionc called");
    try {
        const {username,email,password}=req.body;  //here we directly destructure them from frotend
     //const username=req.body.username
     //const email=req.body.email
     //const password=req.body.password we can take them as separate also 
        
    } catch (error) {
        
        
    }




    
}


export const login=async(req,res)=>{
    console.log("Login functionc called");
}


export const logout=async(req,res)=>{
    console.log("Logout functionc called");
}