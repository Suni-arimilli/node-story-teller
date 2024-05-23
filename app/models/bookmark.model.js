module.exports = (sequelize, Sequelize) => {
    const Bookmark = sequelize.define("bookmark", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      story_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'stories',
          key: 'id'
        }
      },
      last_updated: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
    return Bookmark;
  };  