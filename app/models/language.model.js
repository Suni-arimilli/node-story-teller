module.exports = (sequelize, Sequelize) => {
    const Language = sequelize.define("language", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      language_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      }
    });
    return Language;
  };  