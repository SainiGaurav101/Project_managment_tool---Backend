module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("users", "profile_picture", {
      type: Sequelize.STRING,
      allowNull: true, // Existing users won't be affected
      defaultValue: "default-profile.png", // Dummy profile picture
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("users", "profile_picture");
  },
};
