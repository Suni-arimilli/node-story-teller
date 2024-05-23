module.exports = (sequelize, Sequelize) => {
    const ContentElement = sequelize.define("content_element", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      element_type: {
        type: Sequelize.ENUM('h1','h2','h3','h4','h5','h6', 'paragraph', 'image', 'other'),
        allowNull: false
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      display_order: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
    return ContentElement;
  };
  