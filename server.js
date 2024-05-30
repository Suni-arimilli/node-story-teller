require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/models");

// db.sequelize.sync({ force: true, alter: true });
db.sequelize.sync();

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the StoryTeller backend." });
});

require("./app/routes/auth.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/category.routes.js")(app);
require("./app/routes/configuration.routes.js")(app);
require("./app/routes/language.routes.js")(app);
require("./app/routes/narrative.routes.js")(app);
require("./app/routes/story.routes.js")(app);
require("./app/routes/storyCountry.routes.js")(app);
require("./app/routes/storyRole.routes.js")(app);

const PORT = process.env.PORT || 3200;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}
module.exports = app;
