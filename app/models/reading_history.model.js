module.exports = (sequelize, Sequelize) => {
    const ReadingHistory = sequelize.define("reading_history", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      page_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
    return ReadingHistory;
  };  