module.exports = (sequelize, Sequelize) => {
const StoryCountry = sequelize.define("storyCountry", {
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
  return StoryCountry;
}