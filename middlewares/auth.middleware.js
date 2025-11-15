import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";


// Someone is making request to get user details -> authorize middleware -> Verify -> if valid -> next -> get user details
const authorize = async (req, res, next) => {
    try {
        let token;

        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1];
        }

        // if there is no token
        if(!token) return res.status(401).json({ message: "Unauthorized" });

        // if there is token then decode
        const decoded = jwt.verify(token, JWT_SECRET);

        // if user exist
        const user = await User.findById(decoded.userId);

        //if user does not exist
        if(!user) return res.status(401).json({ message: "Unauthorized" });

        // if user exist, will attach the user to the request that is being made
        req.user = user;

        next();

    } catch(error){
        res.status(401).json({
            message: "Unauthorized",
            error: error.message,
        })
    }
}

export default authorize;