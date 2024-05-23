module.exports = (sequelize, Sequelize) => {
    const Bookmark = sequelize.define("bookmark", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      last_updated: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
    return Bookmark;
  };  