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
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.story = require("./story.model.js")(sequelize, Sequelize);
db.chapter = require("./chapter.model.js")(sequelize, Sequelize);
db.contentElement = require("./content_element.model.js")(sequelize, Sequelize);
db.bookmark = require("./bookmark.model.js")(sequelize, Sequelize);
db.category = require("./category.model.js")(sequelize, Sequelize);
db.readingSession = require("./reading_session.model.js")(sequelize, Sequelize);
db.readingHistory = require("./reading_history.model.js")(sequelize, Sequelize);
db.language = require("./language.model.js")(sequelize, Sequelize);

// Define relationships
db.user.hasMany(db.session, { as: "sessions" });
db.session.belongsTo(db.user, { as: "user" });

db.user.hasMany(db.story, { as: "stories" });
db.story.belongsTo(db.user, { as: "user" });

db.category.hasMany(db.story, { as: "stories" });
db.story.belongsTo(db.category, { as: "category" });

db.story.hasMany(db.chapter, { as: "chapters" });
db.chapter.belongsTo(db.story, { as: "story" });

db.chapter.hasMany(db.contentElement, { as: "contentElements" });
db.contentElement.belongsTo(db.chapter, { as: "chapter" });

db.user.hasMany(db.bookmark, { as: "bookmarks" });
db.bookmark.belongsTo(db.user, { as: "user" });

db.story.hasMany(db.bookmark, { as: "bookmarks" });
db.bookmark.belongsTo(db.story, { as: "story" });

db.user.hasMany(db.readingSession, { as: "readingSessions" });
db.readingSession.belongsTo(db.user, { as: "user" });

db.story.hasMany(db.readingSession, { as: "readingSessions" });
db.readingSession.belongsTo(db.story, { as: "story" });

db.chapter.hasMany(db.readingSession, { as: "readingSessions" });
db.readingSession.belongsTo(db.chapter, { as: "chapter" });

db.user.hasMany(db.readingHistory, { as: "readingHistories" });
db.readingHistory.belongsTo(db.user, { as: "user" });

db.story.hasMany(db.readingHistory, { as: "readingHistories" });
db.readingHistory.belongsTo(db.story, { as: "story" });

db.chapter.hasMany(db.readingHistory, { as: "readingHistories" });
db.readingHistory.belongsTo(db.chapter, { as: "chapter" });

module.exports = db;
