module.exports = (sequelize, Sequelize) => {
const Narrative = sequelize.define("narrative", {
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
  return Narrative;
}