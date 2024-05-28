module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    first_name: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    last_name: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.BLOB,
      allowNull: false,
    },
    salt: {
      type: Sequelize.BLOB,
      allowNull: false,
    },
    is_admin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  });
  return User;
};