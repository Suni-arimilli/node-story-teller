module.exports = {
  HOST: "localhost",
  USER: "sunisha",
  PASSWORD: "sunisha123",
  DB: "StoryTeller",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
