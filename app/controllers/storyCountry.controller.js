const db = require("../models");
const StoryCountry = db.storyCountry;

// Retrieve all StoryCountries from the database.
exports.findAll = async (req, res) => {
  try {
    const data = await StoryCountry.findAll();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving StoryCountries."
    });
  }
};
