const { Sequelize } = require("sequelize");
require("dotenv").config();

// Create a new Sequelize instance using environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,   // task_management
  process.env.DB_USER,   
  process.env.DB_PASS,   
  {
    host: process.env.DB_HOST,   // localhost (or your DB host)
    dialect: "mysql",            // MySQL database
    logging: false               // Optionally disable logging
  }
);

// Test the connection to the database
sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("Database connection error: " + err));

module.exports = sequelize;
