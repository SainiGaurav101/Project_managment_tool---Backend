const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false // ADMIN, MANAGER, MEMBER
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Active' // Active or Inactive
    },
    profile_picture: {
        type: DataTypes.STRING,  // Store image URL or filename
        allowNull: true,  // Existing users won’t be affected
        defaultValue: 'default-profile.png' // Dummy profile image for new users
    }
}, {
    tableName: 'users',
    timestamps: true
});


// const Task = require("./Task");
// const Board = require("./Board");

// User.hasMany(Board, { foreignKey: "created_by" }); // A user (Manager) can create many boards
// User.hasMany(Task, { foreignKey: "assigned_to" }); // A user (Member) can have multiple assigned tasks
// User.hasMany(Task, { foreignKey: "created_by" }); // A user (Manager) can create multiple tasks



module.exports = User;
