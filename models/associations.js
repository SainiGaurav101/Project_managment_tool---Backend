const Task = require("./Task");
const Board = require("./Board");
const User = require("./User");
const ProjectAssignedUser = require("./ProjectAssignedUser");
const TaskAssignedUsers = require("./taskAssignedUsers");

// ✅ Define Relationships Here

// 1️⃣ A Manager (User) can create many boards
User.hasMany(Board, { foreignKey: "created_by" });
Board.belongsTo(User, { foreignKey: "created_by", as: "manager" });



// 2️⃣ A Board (Project) can have multiple assigned Users
Board.belongsToMany(User, { through: ProjectAssignedUser, foreignKey: "project_id", as: "assignedUsers" });
User.belongsToMany(Board, { through: ProjectAssignedUser, foreignKey: "user_id", as: "assignedProjects" });


// // 2️⃣ A User (Member) can have multiple assigned tasks
User.hasMany(Task, { foreignKey: "assignedTo" });
Task.belongsTo(User, { foreignKey: "assignedTo", as: "assignedUser" });

// 3️⃣ A Manager (User) can create multiple tasks
User.hasMany(Task, { foreignKey: "created_by" });
Task.belongsTo(User, { foreignKey: "created_by", as: "creator" });

// 4️⃣ A Board can have multiple tasks
Board.hasMany(Task, { foreignKey: "boardId", onDelete: "CASCADE" });
Task.belongsTo(Board, { foreignKey: "boardId" });

// ✅ Many-to-Many Relationship: Boards ↔ Users
Board.belongsToMany(User, { through: ProjectAssignedUser, foreignKey: "project_id" });
User.belongsToMany(Board, { through: ProjectAssignedUser, foreignKey: "user_id" });


// ✅ Many-to-Many: Tasks can have multiple assigned users
// Task.belongsToMany(User, { through: TaskAssignedUsers, foreignKey: "task_id" });
// User.belongsToMany(Task, { through: TaskAssignedUsers, foreignKey: "user_id" });
// ✅ A Task can have multiple assigned Users (Many-to-Many)
Task.belongsToMany(User, { through: TaskAssignedUsers, foreignKey: "task_id", as: "assignedUsers" });
User.belongsToMany(Task, { through: TaskAssignedUsers, foreignKey: "user_id", as: "tasks" });


module.exports = { Task, Board, User,ProjectAssignedUser,TaskAssignedUsers };
