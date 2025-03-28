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
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true, // Allows soft delete
        
      },
}, {
    tableName: 'users',
    timestamps: true,  // ✅ Ensure timestamps exist (createdAt, updatedAt)
    paranoid: true, // ✅ Enables soft delete in Sequelize
    deletedAt: "deleted_at",
});

module.exports = User;
