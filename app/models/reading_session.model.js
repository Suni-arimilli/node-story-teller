module.exports = (sequelize, Sequelize) => {
    const ReadingSession = sequelize.define("reading_session", {
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
      chapter_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'chapters',
          key: 'id'
        }
      },
      page_id: {
        type: Sequelize.INTEGER,
        allowNull: false
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
  