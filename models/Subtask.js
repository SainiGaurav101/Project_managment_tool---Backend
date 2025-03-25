const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Subtask = sequelize.define('Subtask', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    task_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tasks',
            key: 'id'
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'To Do'
    }
}, {
    timestamps: true,
    tableName: 'subtasks'
});

module.exports = Subtask;
