import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";




// REGISTER
export const registerUser = async (req, res) =>{
    const  { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({email});
        if (userExists) return res.json(400).json({ message: "Userxist"});

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword});
        const token = jwt.sign({
            id: user._id}, process.env.JWT_SECRET,  {
                expiresIn: "7d",
            });
            res.json({ user, token });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//login
export const loginUser = async(req, res) =>{
    const { email, password } = req.body;

    try {
        const user = await User.findOne ({ email });
        if (!user) return res.status(400).json.json({ message: "Invalid Credentials"});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.json({ user, token});
    } catch (err) {
        res.status(500).json({ message: err.message});    }
};