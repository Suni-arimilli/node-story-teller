module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define("category", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    isInUse: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });
  return Category;
};
