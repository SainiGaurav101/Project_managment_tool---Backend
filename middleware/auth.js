// const jwt = require("jsonwebtoken");
//  // Ensure environment variables are loaded
//  require("dotenv").config();

// const authMiddleware = (req, res, next) => {
//     const authHeader = req.header("Authorization");

//     console.log("🔍 Received Header:", authHeader);

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         console.log("❌ No token provided or invalid format");
//         return res.status(401).json({ message: "Access denied, no token provided" });
//     }

//     try {
//          // Extract actual token
//          const token = authHeader.split(" ")[1];
//         console.log("✅ Extracted Token:", token);

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         console.log("✅ Decoded Token:", decoded);

//          // Attach user data (userId, role, etc.) to request
//          req.user = decoded;
//         next();  
//     } catch (error) {
//         console.log("❌ Invalid Token:", error.message);
//         return res.status(401).json({ message: "Invalid token" });
//     }
// };

// module.exports = authMiddleware;
const authMiddleware = (req, res, next) => {
    try {
        console.log("🔍 Checking Session Data:", req.session); // Debugging

        if (!req.session || !req.session.user) {
            return res.status(401).json({ message: "Access denied. Please log in." });
        }

        // ✅ Attach user data to `req.user`
        req.user = req.session.user;

        // ✅ Ensure user has required properties (id, role)
        if (!req.user.id || !req.user.role) {
            return res.status(401).json({ message: "Invalid session data. Please log in again." });
        }

        console.log("✅ Authenticated User:", req.user); // Debugging
        next();
    } catch (error) {
        console.error("❌ Error in authMiddleware:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = authMiddleware;


 
