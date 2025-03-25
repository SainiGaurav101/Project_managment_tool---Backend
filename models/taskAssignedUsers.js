const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Task = require("./Task");

const TaskAssignedUsers = sequelize.define("TaskAssignedUsers", {
    // id: {
    //     type: DataTypes.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true,
    // },
    task_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Task,
            key: "id",
        },
        onDelete: "CASCADE",
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id",
        },
        onDelete: "CASCADE",
    },
}, {
    timestamps: false,
});

module.exports = TaskAssignedUsers;
