
import jwt from "jsonwebtoken";
import user from "../models/user.models.js";

export const authenticate = async (req, res, next) => {
    try {
        // Get the token from cookies
        const token = req.cookies.jwt;
        console.log("Token:", token);
        
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        // Decode and verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("Decoded Token:", decoded);

        // Check if the user ID in the token matches the user ID in the database
        // Find the user by ID in the database
        const existuser = await user.findById(decoded.userId);
        console.log("User Found:", existuser);
           
        if (!existuser) {
            return res.status(404).json({ message: "Unauthorized: User not found" });
        }

        // Attach the user object to the request
        req.user = existuser;

        next();
    } catch (error) {
        console.error("Authentication Error:", error.message);
        return res.status(401).json({ message: "Unauthorized: Token verification failed" });
    }
};

