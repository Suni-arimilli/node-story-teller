module.exports = (sequelize, Sequelize) => {
    const ReadingSession = sequelize.define("reading_session", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      remaining_time: {
        type: Sequelize.INTEGER,
        allowNull: false  // Time in seconds
      },
      last_updated: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
    return ReadingSession;
  };
  