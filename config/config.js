require('dotenv').config(); // Load environment variables

module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: process.env.DB_NAME || 'task_management',
    host: process.env.DB_HOST || 'localhost',
    dialect: "mysql"
  },
  test: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: process.env.DB_NAME || 'task_management',
    host: process.env.DB_HOST || 'localhost',
    dialect: "mysql"
  },
  production: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: process.env.DB_NAME || 'task_management',
    host: process.env.DB_HOST || 'localhost',
    dialect: "mysql"
  }
};
