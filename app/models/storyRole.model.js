module.exports = (sequelize, Sequelize) => {
const StoryRole = sequelize.define("storyRole", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
    }
  });
  return StoryRole;
}