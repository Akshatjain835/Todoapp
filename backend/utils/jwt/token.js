
import jwt from "jsonwebtoken"
import user from "../../models/user.models.js"

export const generateTokenAndSaveCookies = async (idofuser, res) => {
    const token = jwt.sign({ userId: idofuser }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
    console.log(token);

    res.cookie("jwt", token, {
        // httpOnly: true,
        expires: new Date(Date.now() + 1 * 60 * 60 * 1000),  // 1 hour
        sameSite: "lax",
        secure: false,
        path: "/"
    });
    await user.findByIdAndUpdate(idofuser, { token });
    return token;
}

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
        console.error("Error verifying token:", error.message);
        throw new Error("Invalid token");
    }
};
