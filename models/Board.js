const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
// const Task = require("./Task");
const Board = sequelize.define("Board", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    project_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    created_by_name: {  // ✅ Store creator's name directly
        type: DataTypes.STRING,
        allowNull: false,
    },
    company_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    deadline: {  // ✅ New Field for Project Deadline
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("active", "inactive"),
        allowNull: false,
        defaultValue: "active",
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Ensures createdAt gets a default value
    },
}, {
    tableName: "boards",
    timestamps: false,  // `updatedAt` is not present in your DB
});


// const Task = require("./Task");


// Board.hasMany(Task, { foreignKey: "boardId", onDelete: "CASCADE" }); // A board can have multiple tasks
// Board.belongsTo(User, { foreignKey: "created_by", as: "manager" }); // A board is created by a manager

module.exports = Board;
