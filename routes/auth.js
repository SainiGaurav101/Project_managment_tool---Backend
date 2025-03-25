const express = require("express");
const bcrypt = require("bcryptjs");
const  User  = require("../models/User");
const router = express.Router();

// ✅ User Registration
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            status: "Active",
            profile_picture: "default-profile.png" // Assign default profile picture
        });

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
});

// ✅ User Login (Session-Based)
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("🔍 Checking user in database...");
        console.log("Received Email:", email);
        console.log("Received Password:", password);

        // Find user by email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            console.log("❌ User not found in database!");
            return res.status(401).json({ message: "Invalid email or password" });
        }

        console.log("✅ User found:", user.name);
        console.log("Stored Hashed Password:", user.password);

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("❌ Password does not match!");
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Store user in session
        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
            profile_picture: user.profile_picture, // ✅ Include profile picture
        };

        console.log("✅ Storing session:", req.session.user);

        res.json({ message: "Login successful", user: req.session.user });
    } catch (error) {
        console.error("❌ Error logging in:", error);
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
});

// ✅ User Logout
router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Error logging out" });
        }
        res.clearCookie("connect.sid"); // Remove session cookie
        res.json({ message: "Logout successful" });
    });
});


// trying something if it works out you get you life otherwise you are done man
// router.get("/session", (req, res) => {
//     if (req.session.user) {
//         res.json({ user: req.session.user });
//     } else {
//         res.status(401).json({ message: "Session expired" });
//     }
// });


module.exports = router;
