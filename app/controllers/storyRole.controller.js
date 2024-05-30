const db = require("../models");
const StoryRole = db.storyRole;

// Retrieve all StoryRoles from the database.
exports.findAll = async (req, res) => {
  try {
    const data = await StoryRole.findAll();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving StoryRoles."
    });
  }
};