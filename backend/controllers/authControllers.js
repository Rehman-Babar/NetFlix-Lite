import { User } from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwttokenAndSetCookie from "../utils/genrateTokens.js";
// SignUp Controller
export const Signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: "Please fill all the fields!" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {  
            return res.status(400).json({ error: "Invalid email format" });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long" });
        }

        const existedUser = await User.findOne({ username });
        if (existedUser) {
            return res.status(400).json({ error: "Username already taken" });
        }

        const existedEmail = await User.findOne({ email });
        if (existedEmail) {
            return res.status(400).json({ error: "Email already taken" });
        }

        const salt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(password, salt);

        const profileImg = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
        const image = profileImg[Math.floor(Math.random() * profileImg.length)];
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            image
        });
        if (newUser) {
            jwttokenAndSetCookie(newUser._id, res);
            await newUser.save();
            return res.status(201).json({success:true, user:{
                ...newUser._doc,
                password:""
            }});
        } else {
        return res.status(500).json({ error: "Invalied user data." });
        }
        
    } catch (error) {
        console.log("Error in signup controller:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Login Controller
export const Login =async (req, res) => {
try {
    const {email, password} =req.body
    if (!email || !password) {
        return res.status(400).json({error:"please provide both email and password"})
    }
    const user = await User.findOne({email})
    if (!user) {
        return res.status(400).json({error:"Invalid credentials"})
    }
    const passwordIsValid = await bcrypt.compare(password, user.password)
    if (!passwordIsValid) {
        return res.status(400).json({error:"Invalid password"})
    }
    jwttokenAndSetCookie(user._id, res)
    return res.status(200).json({success:true, user:{
        ...user._doc,
        password:""
    }})
} catch (error) {
    console.log("Error in login controller:", error);
    return res.status(500).json({ error: "Internal Server Error" });
}
};

// Logout Controller
export const Logout =async (req, res) => {
try {
    res.cookie("jwtNetflix", "", {maxAge:0})
    return res.status(200).json({success:true, message:"Logout Success Successfully"})
} catch (error) {
    console.log("Error in logout controller:", error);
        return res.status(500).json({ error: "Internal Server Error" });
}
}

export const GetMe = async(req, res) => {
    
    try {
        const user = await User.findById(req.user?._id).select("-password")
        if (!user) {
            res.status(404).json({error:"User not found"})
        }
        res.status(200).json({user:user})
    } catch (error) {
        console.log("error in GetMe controller:", error.message);
        res.status(500).json({error:"Internal Server Error"})
    }
}

