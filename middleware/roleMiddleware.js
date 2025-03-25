const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        try {
            console.log("🔍 Checking User in Middleware:", req.user); // Debugging
            
            if (!req.user) {
                return res.status(401).json({ message: "Unauthorized: No user data found" });
            }

            console.log("✅ User Role Found:", req.user.role);

            // Convert roles to uppercase for case-insensitive comparison
            const normalizedRoles = allowedRoles.map(role => role.toUpperCase());

            if (!normalizedRoles.includes(req.user.role.toUpperCase())) {
                return res.status(403).json({ message: "Forbidden: You do not have permission" });
            }

            next(); // User is authorized, proceed
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    };
};

module.exports = roleMiddleware;
