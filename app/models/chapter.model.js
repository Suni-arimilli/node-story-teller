module.exports = (sequelize, Sequelize) => {
    const Chapter = sequelize.define("chapter", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      chapter_number: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: true
      }
    });
    return Chapter;
  };  