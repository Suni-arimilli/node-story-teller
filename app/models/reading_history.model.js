module.exports = (sequelize, Sequelize) => {
    const ReadingHistory = sequelize.define("reading_history", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      }
    });
    return ReadingHistory;
  };  