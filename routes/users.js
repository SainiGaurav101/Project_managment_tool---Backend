// const express = require("express");
// const router = express.Router();
// const User  = require("../models/User");
// const authMiddleware = require("../middleware/auth");
// const roleMiddleware = require("../middleware/roleMiddleware");
// const multer = require("multer");
// const path = require("path");


// // ✅ Storage configuration for profile pictures
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/"); // Save images in the 'uploads' folder
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
//     },
// });

// // ✅ File filter to allow only images
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith("image/")) {
//         cb(null, true);
//     } else {
//         cb(new Error("Only image files are allowed!"), false);
//     }
// };

// // ✅ Upload middleware
// const upload = multer({ storage, fileFilter });





// // ✅ Get all users - Only Admin and manager can access
// router.get("/", authMiddleware, roleMiddleware(["admin", "manager"]), async (req, res) => {
//     try {
//         const users = await User.findAll({
//             attributes: ["id", "name", "email", "role", "status", "createdAt"],
//         });

//         res.status(200).json(users);
//     } catch (error) {
//         console.error("❌ Error fetching users:", error.message);
//         res.status(500).json({ message: "Error fetching users", error: error.message });
//     }
// });


// // ✅ Delete a user - Only Admin can delete users
// router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), async (req, res) => {
//     try {
//         const userId = req.params.id;

//         // Prevent admin from deleting themselves
//         if (req.user.id.toString() === userId) {
//             return res.status(403).json({ message: "Admins cannot delete their own account" });
//         }

//         // Check if user exists before deleting
//         const user = await User.findOne({ where: { id: userId } });
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Remove user from all projects before deleting
//         await user.setAssignedProjects([]); // This will remove all project associations

//         // Delete profile picture if not default
//         const fs = require("fs");
//         if (user.profile_picture && user.profile_picture !== "default-profile.png") {
//             fs.unlinkSync(`uploads/${user.profile_picture}`);
//         }

//         // Delete user
//         await user.destroy();

//         res.status(200).json({ message: "User deleted successfully" });
//     } catch (error) {
//         console.error("❌ Error deleting user:", error.message);
//         res.status(500).json({ message: "Error deleting user", error: error.message });
//     }
// });



// // ✅ Update user details - Only Admin can edit users
// router.put("/:id", authMiddleware, roleMiddleware(["admin"]), async (req, res) => {
//     try {
//         const { name, email, role } = req.body;
//         const userId = req.params.id;

//         // Find the user by ID
//         const user = await User.findByPk(userId);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Update user fields if provided
//         user.name = name || user.name;
//         user.email = email || user.email;
//         user.role = role || user.role;

//         // Save updated user details
//         await user.save();

//         res.status(200).json({ message: "User updated successfully", user });
//     } catch (error) {
//         console.error(" Error updating user:", error.message);
//         res.status(500).json({ message: "Error updating user", error: error.message });
//     }
// });




// // ✅ Upload Profile Picture Route
// router.post("/upload-profile", authMiddleware, upload.single("profile_picture"), async (req, res) => {
//     try {
//         const userId = req.user.id; // Get user ID from the logged-in user

//         if (!req.file) {
//             return res.status(400).json({ message: "No file uploaded" });
//         }

//         const user = await User.findByPk(userId);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // ✅ Save the new profile picture path in the database
//         user.profile_picture = req.file.filename; // Save only filename
//         await user.save();

//         res.status(200).json({
//             message: "Profile picture uploaded successfully",
//             profile_picture: `/uploads/${req.file.filename}`,
//         });

//     } catch (error) {
//         console.error("❌ Error uploading profile picture:", error.message);
//         res.status(500).json({ message: "Error uploading profile picture", error: error.message });
//     }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");
const roleMiddleware = require("../middleware/roleMiddleware");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ✅ Storage configuration for profile pictures
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save images in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    },
});

// ✅ File filter to allow only images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"), false);
    }
};

// ✅ Upload middleware
const upload = multer({ storage, fileFilter });


// ✅ Get all users - Only Admin and Manager can access
router.get("/", authMiddleware, roleMiddleware(["admin", "manager"]), async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ["id", "name", "email", "role", "status", "profile_picture", "createdAt"],
        });

        res.status(200).json(users);
    } catch (error) {
        console.error("❌ Error fetching users:", error.message);
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
});


// ✅ Delete a user - Only Admin can delete users
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), async (req, res) => {
    try {
        const userId = req.params.id;

        // Prevent admin from deleting themselves
        if (req.user.id.toString() === userId) {
            return res.status(403).json({ message: "Admins cannot delete their own account" });
        }

        // Check if user exists before deleting
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


         // ❌ Prevent an admin from deleting another admin
         if (user.role === "admin") {
            return res.status(403).json({ message: "Admins cannot delete other admins" });
        }

        // ✅ Remove user from all projects before deleting
        await user.setAssignedProjects([]); // This will remove all project associations

        // ✅ Delete profile picture if not default
        if (user.profile_picture && user.profile_picture !== "default-profile.png") {
            const filePath = path.join(__dirname, "../uploads", user.profile_picture);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        // ✅ Delete user
        await user.destroy();

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("❌ Error deleting user:", error.message);
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
});


// ✅ Update user details - Only Admin can edit users
router.put("/:id", authMiddleware, roleMiddleware(["admin"]), async (req, res) => {
    try {
        const { name, email, role } = req.body;
        const userId = req.params.id;

        // Find the user by ID
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update user fields if provided
        user.name = name || user.name;
        user.email = email || user.email;
        user.role = role || user.role;

        // Save updated user details
        await user.save();

        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        console.error("❌ Error updating user:", error.message);
        res.status(500).json({ message: "Error updating user", error: error.message });
    }
});


// ✅ Upload Profile Picture Route
router.post("/upload-profile", authMiddleware, upload.single("profile_picture"), async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from the logged-in user

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // ✅ Remove old profile picture (if exists and not default)
        if (user.profile_picture && user.profile_picture !== "default-profile.png") {
            const filePath = path.join(__dirname, "../uploads", user.profile_picture);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        // ✅ Save the new profile picture path in the database
        user.profile_picture = req.file.filename; // Save only filename
        await user.save();

        res.status(200).json({
            message: "Profile picture uploaded successfully",
            profile_picture: `/uploads/${req.file.filename}`,
        });

    } catch (error) {
        console.error("❌ Error uploading profile picture:", error.message);
        res.status(500).json({ message: "Error uploading profile picture", error: error.message });
    }
});

module.exports = router;
