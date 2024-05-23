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
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id'
        }
      },
      publication_date: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
    return Story;
  };  