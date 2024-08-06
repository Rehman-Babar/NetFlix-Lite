import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';
// Protected routes middleware function.
export const protectedRoutes = async (req, res, next) => {
    try {
        // Get the token from the headers

        const token = req.cookies.jwtNetflix;
        if (!token) {
            return res.status(401).json({ message: 'Access token is missing or invalid' });
        }
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        // find user
        const user = await User.findById(decoded.userId).select("-password");
        // check user
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Add user 
        req.user = user;
        next();
    } catch (error) {
        console.error("error in protect routes",error);
        res.status(500).json({error:"Please login or signup first."})
    }
}