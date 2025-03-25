const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Board = require("./Board");

const ProjectAssignedUser = sequelize.define("ProjectAssignedUser", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Board,
            key: "id",
        },
        onDelete: "CASCADE",
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id",
        },
        onDelete: "CASCADE",
    },
    role: {
        type: DataTypes.STRING,
        allowNull: true,  // Optional (e.g., "Developer", "Tester")
    },
}, {
    tableName: "project_assigned_users",
    timestamps: false,
});

module.exports = ProjectAssignedUser;
