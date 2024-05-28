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
      }
    });
    return Category;
  };
  