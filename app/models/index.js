const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  define: {
    timestamps: false
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.story = require("./story.model.js")(sequelize, Sequelize);
db.category = require("./category.model.js")(sequelize, Sequelize);
db.language = require("./language.model.js")(sequelize, Sequelize);
db.storyCountry = require("./storyCountry.model.js")(sequelize,Sequelize);
db.storyRole = require("./storyRole.model.js")(sequelize,Sequelize);
db.narrative = require("./narrative.model.js")(sequelize,Sequelize);
db.configuration = require("./configuration.model.js")(sequelize,Sequelize);

// Define relationships
db.user.hasMany(db.session, { as: "sessions" });
db.session.belongsTo(db.user, { as: "user" });

db.user.hasMany(db.story, { as: "stories" });
db.story.belongsTo(db.user, { as: "user" });

db.category.hasMany(db.story, { as: "stories" });
db.story.belongsTo(db.category, { as: "category" });

db.storyCountry.hasMany(db.story, { as: "stories" });
db.story.belongsTo(db.storyCountry, { as: "storyCountry" });

db.storyRole.hasMany(db.story, { as: "stories" });
db.story.belongsTo(db.storyRole, { as: "storyRole" });

db.narrative.hasMany(db.story, { as: "stories" });
db.story.belongsTo(db.narrative, { as: "narrative" });

db.configuration.hasMany(db.story, { as: "stories" });
db.story.belongsTo(db.configuration, { as: "configuration" });

db.language.hasMany(db.story, { as: "stories" });
db.story.belongsTo(db.language, { as: "language" });


module.exports = db;
