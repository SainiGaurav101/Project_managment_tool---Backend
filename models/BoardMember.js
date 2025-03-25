const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BoardMember = sequelize.define('BoardMember', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    board_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "boards",
            key: "id"
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id"
        }
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false // MANAGER, MEMBER
    }
}, {
    tableName: 'board_members',
    timestamps: true
});

module.exports = BoardMember;
