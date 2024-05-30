module.exports = (sequelize, Sequelize) => {
    const Story = sequelize.define("story", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      publication_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    });
    return Story;
  };  