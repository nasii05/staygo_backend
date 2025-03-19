import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists", status: res.status(400), error: true });

        const user = await User.create({ name, email, password });
        res.status(201).json({ message: "User Registered Successfully", status: res.status(201), erorr: false })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Login User
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: "Invalid Credentials", isValid: false });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;