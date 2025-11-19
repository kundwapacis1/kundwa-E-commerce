import jwt from "jsonwebtoken";
import User from "../models/user.js";



export const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization && 
        req.headers.authorization.startWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user  = await User.findById(decoded.id).select("-password");
            next();
        } catch (err) {
            res.status(401).json({ message: "not authorized"});
        }
    }
    if (!token) {
        res.status(401).json({ message: "Not authorized, no token"});
    }
};