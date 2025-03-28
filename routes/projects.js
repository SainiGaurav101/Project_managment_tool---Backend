// const express = require("express");
// const router = express.Router();
// const Board  = require("../models/Board"); // Make sure this path is correct
// const Task = require("../models/Task");
// const User = require("../models/User"); 
// const authMiddleware = require("../middleware/auth"); // Ensure authentication
// const roleMiddleware = require("../middleware/roleMiddleware"); // Import RBAC middleware



// //Get All Projects with Their Tasks
// router.get("/", authMiddleware, async (req, res) => {
//     try {
//         let projects;
//         if (req.user.role === "ADMIN") {const express = require("express");
//             const router = express.Router();
//             const Board = require("../models/Board");
//             const Task = require("../models/Task");
//             const User = require("../models/User");
//             const ProjectAssignedUser = require("../models/ProjectAssignedUser"); // Many-to-Many Table
//             const authMiddleware = require("../middleware/auth");
//             const roleMiddleware = require("../middleware/roleMiddleware");
            
//             // ✅ Get All Projects with Their Tasks
//             router.get("/", authMiddleware, async (req, res) => {
//                 try {
//                     let projects;
//                     if (req.user.role === "ADMIN") {
//                         projects = await Board.findAll({
//                             include: [
//                                 {
//                                     model: Task,
//                                     include: [
//                                         { model: User, as: "assignedUser", attributes: ["id", "name", "role"] },
//                                         { model: User, as: "creator", attributes: ["id", "name", "role"] }
//                                     ]
//                                 },
//                                 { model: User, as: "manager", attributes: ["id", "name", "role"] },
//                                 { model: User, as: "assignedUsers", attributes: ["id", "name"] } // Fixes many-to-many relation
//                             ],
//                         });
//                     } else if (req.user.role === "MANAGER") {
//                         projects = await Board.findAll({
//                             where: { created_by: req.user.id },
//                             include: [
//                                 { model: User, as: "manager", attributes: ["id", "name", "role"] }
//                             ],
//                         });
//                     } else {
//                         projects = await Board.findAll({
//                             include: [
//                                 {
//                                     model: User,
//                                     as: "assignedUsers",
//                                     where: { id: req.user.id },
//                                     attributes: ["id", "name"]
//                                 }
//                             ]
//                         });
//                     }
            
//                     res.json(projects);
//                 } catch (error) {
//                     res.status(500).json({ message: "Error fetching projects", error: error.message });
//                 }
//             });
            
//             // ✅ Create a Project (Only ADMIN & MANAGER)
//             router.post("/", authMiddleware, roleMiddleware(["ADMIN", "MANAGER"]), async (req, res) => {
//                 try {
//                     const { project_name, deadline, status, assigned_members } = req.body;
//                     const created_by = req.user.id;
            
//                     if (!project_name || !deadline) {
//                         return res.status(400).json({ message: "Missing required fields" });
//                     }
            
//                     // ✅ Create Project
//                     const newBoard = await Board.create({
//                         project_name,
//                         created_by,
//                         deadline,
//                         status: status || "active",
//                     });
            
//                     // ✅ Assign Members to Project (if provided)
//                     if (assigned_members && assigned_members.length > 0) {
//                         await newBoard.addAssignedUsers(assigned_members);
//                     }
            
//                     res.status(201).json(newBoard);
//                 } catch (error) {
//                     res.status(500).json({ message: "Error creating project", error: error.message });
//                 }
//             });
            
//             // ✅ Get All Projects (Only ADMIN)
//             router.get("/all", authMiddleware, roleMiddleware(["ADMIN"]), async (req, res) => {
//                 try {
//                     const projects = await Board.findAll();
//                     res.status(200).json(projects);
//                 } catch (error) {
//                     res.status(500).json({ message: "Error fetching projects", error: error.message });
//                 }
//             });
            
//             // ✅ Delete a Project (Only ADMIN)
//             router.delete("/:id", authMiddleware, roleMiddleware(["ADMIN"]), async (req, res) => {
//                 try {
//                     const BoardId = req.params.id;
            
//                     // ✅ First, delete related tasks
//                     await Task.destroy({ where: { boardId: BoardId } });
            
//                     // ✅ Then, delete the project
//                     await Board.destroy({ where: { id: BoardId } });
            
//                     res.status(200).json({ message: "Project deleted successfully" });
//                 } catch (error) {
//                     res.status(500).json({ message: "Error deleting project", error: error.message });
//                 }
//             });
            
//             module.exports = router;
            
//             // Admin sees all projects
//             projects = await Board.findAll({
//                 include: [
//                     {
//                         model: Task,
//                         include: [
//                             { model: User, as: "assignedUser", attributes: ["id", "name", "role"] },
//                             { model: User, as: "creator", attributes: ["id", "name", "role"] }
//                         ]
//                     },
//                     { model: User, as: "manager", attributes: ["id", "name", "role"] }
//                 ],
//             });
//         } else if (req.user.role === "MANAGER") {
//             // Manager sees only projects they created
//             projects = await Board.findAll({
//                 where: { created_by: req.user.id },
//                 include: [
//                     { model: User, as: "manager", attributes: ["id", "name", "role"] }
//                 ],
//             });
//         } else {
//             // Member sees only assigned projects
//             projects = await Board.findAll({
//                 include: [
//                     {
//                         model: User,
//                         as: "assignedUsers", // Need to define many-to-many relationship
//                         where: { id: req.user.id },
//                         attributes: ["id", "name"]
//                     }
//                 ]
//             });
//         }

//         res.json(projects);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching projects", error: error.message });
//     }
// });




// // ✅ Create a Board - Only MANAGER and ADMIN can create a Board
// router.post("/", authMiddleware, roleMiddleware(["ADMIN", "MANAGER"]), async (req, res) => {
//     try {
//         const { project_name, company_name, deadline, status, assigned_members } = req.body;
//         const created_by = req.user.id; // ✅ Manager/Admin ID
//         const creator_name = req.user.name;

//         if (!project_name || !company_name || !deadline) {
//             return res.status(400).json({ message: "Missing required fields" });
//         }

//         // Create Project (Board)
//         const newBoard = await Board.create({
//             project_name,
//             created_by,
//             company_name,
//             deadline,
//             status: status || "active",
//         });

//         // ✅ Assign Members to Project (if provided)
//         if (assigned_members && assigned_members.length > 0) {
//             await newBoard.addUsers(assigned_members); // Many-to-Many relation
//         }

//         res.status(201).json(newBoard);
//     } catch (error) {
//         res.status(500).json({ message: "Error creating Board", error: error.message });
//     }
// });


// // ✅ Get all Boards - Only ADMIN can see all Boards
// router.get("/all", authMiddleware, roleMiddleware(["ADMIN"]), async (req, res) => {
//     try {
//         const Boards = await Board.findAll();
//         res.status(200).json(Boards);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching Boards", error: error.message });
//     }
// });

// // ✅ Delete a Board - Only ADMIN can delete
// router.delete("/:id", authMiddleware, roleMiddleware(["ADMIN"]), async (req, res) => {
//     try {
//         const BoardId = req.params.id;
//         await Board.destroy({ where: { id: BoardId } });
//         res.status(200).json({ message: "Board deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Error deleting Board", error: error.message });
//     }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Board = require("../models/Board");
const Task = require("../models/Task");
const User = require("../models/User");
const ProjectAssignedUser = require("../models/ProjectAssignedUser"); // Many-to-Many Table
const authMiddleware = require("../middleware/auth");
const roleMiddleware = require("../middleware/roleMiddleware");
const { Op } = require("sequelize"); // Import Op for advanced queries

// ✅ Get All Projects with Their Tasks
router.get("/details", authMiddleware, async (req, res) => {
    try {
        let projects;
        if (req.user.role === "ADMIN") {
            projects = await Board.findAll({
                include: [
                    {
                        model: Task,
                        include: [
                            { model: User, as: "assignedUser", attributes: ["id", "name", "role"] },
                            { model: User, as: "creator", attributes: ["id", "name", "role"] }
                        ]
                    },
                    { model: User, as: "manager", attributes: ["id", "name", "role"] },
                    { model: User, as: "assignedUsers", attributes: ["id", "name"] } // Many-to-Many relation
                ],
            });
        } else if (req.user.role === "MANAGER") {
            projects = await Board.findAll({
                where: { created_by: req.user.id },
                include: [
                    { model: User, as: "manager", attributes: ["id", "name", "role"] }
                ],
            });
        } else {
            projects = await Board.findAll({
                include: [
                    {
                        model: User,
                        as: "assignedUsers",
                        where: { id: req.user.id },
                        attributes: ["id", "name"]
                    }
                ]
            });
        }

        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: "Error fetching projects", error: error.message });
    }
});

// ✅ Create a Project (Only ADMIN & MANAGER)
router.post("/", authMiddleware, roleMiddleware(["ADMIN", "MANAGER"]), async (req, res) => {
    try {
        const { project_name, deadline, status, assigned_members,company_name } = req.body;
        const created_by = req.user.id;
        const created_by_name = req.user.name; // ✅ Store creator's name

        if (!project_name || !deadline) {
            return res.status(400).json({ message: "Missing required fields" });
        }
         // ✅ Validate assigned users exist before adding
         const existingUsers = await User.findAll({
            where: { id: assigned_members }
        });

        if (existingUsers.length !== assigned_members.length) {
            return res.status(400).json({ message: "One or more assigned members do not exist" });
        }

        // ✅ Create Project
        const newBoard = await Board.create({
            project_name,
            created_by,
            created_by_name,
            company_name,
            deadline,
            status: status || "active",
        });

        // ✅ Assign Members to Project (if provided)
        if (assigned_members && assigned_members.length > 0) {
            await newBoard.addAssignedUsers(assigned_members);
        }
        // ✅ Fetch assigned users after creation
const assignedUsers = await User.findAll({
    where: { id: assigned_members },
    attributes: ["id", "name", "role"]
});

// ✅ Send response with assigned user details
        res.status(201).json({
            ...newBoard.toJSON(),
            assigned_users: assignedUsers // Now assigned users are included!
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating project", error: error.message });
    }
});


// ✅ Add Members to a Project (Only Admin & Manager)
router.post("/:id/add-members", authMiddleware, roleMiddleware(["ADMIN", "MANAGER"]), async (req, res) => {
    try {
        const { id } = req.params; // Project ID
        const { members } = req.body; // List of user IDs to add

        if (!Array.isArray(members) || members.length === 0) {
            return res.status(400).json({ message: "Provide at least one member to add." });
        }

        const project = await Board.findByPk(id);
        if (!project) {
            return res.status(404).json({ message: "Project not found." });
        }

        const existingUsers = await User.findAll({ where: { id: members } });

        if (existingUsers.length !== members.length) {
            return res.status(400).json({ message: "One or more users do not exist." });
        }

        await project.addAssignedUsers(members); // Many-to-Many relation

        res.status(200).json({ message: "Members added successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error adding members", error: error.message });
    }
});





// ✅ Admin fetches all projects with assigned users
router.get("/all", authMiddleware, roleMiddleware(["ADMIN"]), async (req, res) => {
    try {
        console.log("Board Associations:", Board.associations);
        console.log("User Associations:", User.associations);
        const projects = await Board.findAll({
            
            include: [
                {
                    model: User,
                    as: "assignedUsers",
                    attributes: ["id", "name", "role"],
                    through: { attributes: [] }, // Exclude pivot table details 
                    // paranoid: false,  // 🔥 This ensures soft-deleted users are included
                }
            ],
            // paranoid: false,  // 🔥 This ensures soft-deleted projects are included
        });
        console.log("Fetched Projects:", JSON.stringify(projects, null, 2));
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: "Error fetching projects", error: error.message });
    }
});

// ✅ Manager fetches only the projects they created, including assigned users
router.get("/my-projects", authMiddleware, roleMiddleware(["MANAGER"]), async (req, res) => {
    try {
        const managerId = req.user.id; // Get logged-in manager ID
        
        const projects = await Board.findAll({
            where: { created_by: managerId },
            include: [
                {
                    model: User,
                    as: "assignedUsers",
                    attributes: ["id", "name", "role"],
                    through: { attributes: [] }, // Exclude pivot table details
                }
            ]
        });

        res.status(200).json({ projects });
    } catch (error) {
        res.status(500).json({ message: "Error fetching projects", error: error.message });
    }
});






// ✅ Delete a Project (Only ADMIN)
// router.delete("/:id", authMiddleware, roleMiddleware(["ADMIN"]), async (req, res) => {
//     try {
//         const BoardId = req.params.id;

//         // ✅ First, delete related tasks
//         await Task.destroy({ where: { boardId: BoardId } });

//         // ✅ Remove project assignments from `ProjectAssignedUser`
//         await ProjectAssignedUser.destroy({ where: { project_id: BoardId} });

//         // ✅ Then, delete the project
//         await Board.destroy({ where: { id: BoardId } });

//         res.status(200).json({ message: "Project deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Error deleting project", error: error.message });
//     }
// });


// ✅ Soft Delete a Project (Only ADMIN)
router.delete("/:id", authMiddleware, roleMiddleware(["ADMIN"]), async (req, res) => {
    try {
        const boardId = req.params.id;

        // ✅ Check if the project exists
        const board = await Board.findOne({ where: { id: boardId } });
        if (!board) {
            return res.status(404).json({ message: "Project not found" });
        }

        // ✅ Soft delete related tasks (if tasks also have soft delete enabled)
        await Task.update({ deleted_at: new Date() }, { where: { boardId: boardId } });

        // ✅ Soft delete project assignments
        await ProjectAssignedUser.update({ deleted_at: new Date() }, { where: { project_id: boardId } });

        // ✅ Soft delete the project instead of permanent delete
        await board.destroy();

        res.status(200).json({ message: "Project moved to trash successfully" });
    } catch (error) {
        console.error("❌ Error deleting project:", error.message);
        res.status(500).json({ message: "Error deleting project", error: error.message });
    }
});


// ✅ Restore Deleted Project (Only Admin)
router.put("/restore/:id", authMiddleware, roleMiddleware(["admin"]), async (req, res) => {
    try {
        const boardId = req.params.id;

        // ✅ Find soft-deleted project
        const board = await Board.findOne({ where: { id: boardId }, paranoid: false });
        if (!board || board.deleted_at === null) {
            return res.status(404).json({ message: "Project not found or not deleted" });
        }

        // ✅ Restore the project
        await board.restore();

        // ✅ Restore related tasks (if tasks also have soft delete enabled)
        await Task.update({ deleted_at: null }, { where: { boardId: boardId }, paranoid: false });

        // ✅ Restore project assignments
        await ProjectAssignedUser.update({ deleted_at: null }, { where: { project_id: boardId }, paranoid: false });

        res.status(200).json({ message: "Project restored successfully" });
    } catch (error) {
        console.error("❌ Error restoring project:", error.message);
        res.status(500).json({ message: "Error restoring project", error: error.message });
    }
});

//Op is used to create advanced queries like Op.ne (not equal), Op.like, etc.
// It is part of Sequelize and allows you to build complex queries using operators.
// ✅ Get all deleted users (trash) - Only Admin can access
//If Op is not imported, Sequelize doesn’t recognize it, causing the error.
// const { Op } = require("sequelize");
router.get("/trash", authMiddleware, roleMiddleware(["admin"]), async (req, res) => {
    try {
        const deletedProjects = await Board.findAll({ 
            where: { deleted_at: { [Op.ne]: null } }, 
            paranoid: false 
        });

        res.status(200).json({ deletedProjects });
    } catch (error) {
        console.error("❌ Error fetching deleted projects:", error.message);
        res.status(500).json({ message: "Error fetching deleted projects" });
    }
});

router.delete("/trash/:id", authMiddleware, roleMiddleware(["admin"]), async (req, res) => {
    try {
        const boardId = req.params.id;

        // Find the board
        const board = await Board.findOne({ where: { id: boardId }, paranoid: false });
        if (!board) {
            return res.status(404).json({ message: "Project not found in trash" });
        }

        // Delete all related tasks
        await Task.destroy({ where: { boardId }, force: true });

        // Delete project assignments
        await ProjectAssignedUser.destroy({ where: { project_id: boardId }, force: true });

        // Permanently delete the project
        await board.destroy({ force: true });

        res.status(200).json({ message: "Project permanently deleted" });
    } catch (error) {
        console.error("❌ Error permanently deleting project:", error.message);
        res.status(500).json({ message: "Error permanently deleting project" });
    }
});




// ✅ Get All Projects Assigned to a Member
router.get("/assigned-projects", authMiddleware, roleMiddleware(["MEMBER"]), async (req, res) => {
    try {
        const memberId = req.user.id; // Get the logged-in Member ID
        
        // Find projects where the member is assigned
        const projects = await Board.findAll({
            include: [
                {
                    model: User,
                    as: "assignedUsers",
                    where: { id: memberId }, // Filter projects assigned to this member
                    attributes: ["id", "name"]
                }
            ]
        });

        res.status(200).json({ projects });
    } catch (error) {
        res.status(500).json({ message: "Error fetching assigned projects", error: error.message });
    }
});



// ✅ Get Project by ID (All Details)
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        // ✅ Find project with related data
        const project = await Board.findOne({
            where: { id },
            include: [
                {
                    model: Task,
                    include: [
                        { model: User, as: "assignedUser", attributes: ["id", "name", "role","profile_picture"] },
                        { model: User, as: "creator", attributes: ["id", "name", "role","profile_picture"] }
                    ]
                },
                { model: User, as: "manager", attributes: ["id", "name", "role","profile_picture"] },
                { 
                    model: User, 
                    as: "assignedUsers", 
                    attributes: ["id", "name", "role","profile_picture"],
                    through: { attributes: [] } // Exclude pivot table details
                }
            ]
        });

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: "Error fetching project details", error: error.message });
    }
});

// ✅ Remove Members from a Project (Only Admin & Manager)
router.delete("/:id/remove-members", authMiddleware, roleMiddleware(["ADMIN", "MANAGER"]), async (req, res) => {
    try {
        const { id } = req.params; // Project ID
        const { members } = req.body; // List of user IDs to remove

        if (!Array.isArray(members) || members.length === 0) {
            return res.status(400).json({ message: "Provide at least one member to remove." });
        }

        const project = await Board.findByPk(id);
        if (!project) {
            return res.status(404).json({ message: "Project not found." });
        }

        const existingUsers = await User.findAll({ where: { id: members } });

        if (existingUsers.length !== members.length) {
            return res.status(400).json({ message: "One or more users do not exist." });
        }

        // ✅ Remove users from the many-to-many relationship
        await project.removeAssignedUsers(members);

        res.status(200).json({ message: "Members removed successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error removing members", error: error.message });
    }
});




module.exports = router;
