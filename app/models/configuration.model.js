module.exports = (sequelize, Sequelize) => {
const Configuration = sequelize.define("configuration", {
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
  return Configuration;
};