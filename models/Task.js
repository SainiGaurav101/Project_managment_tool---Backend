const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Board = require("./Board");

const Task = sequelize.define("Task", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("todo", "in-progress", "done"),
        allowNull: false,
        defaultValue: "todo",
    },
    priority: {
        type: DataTypes.ENUM("low", "medium", "high", "urgent"),
        allowNull: false,
        defaultValue: "medium",
    },
    progress: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: { min: 0, max: 100 },
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id",
        },
        onDelete: "CASCADE",
    },
    boardId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Board,
            key: "id",
        },
        onDelete: "CASCADE",
    },
}, {
    timestamps: true, // ✅ Includes createdAt & updatedAt automatically
});

module.exports = Task;
