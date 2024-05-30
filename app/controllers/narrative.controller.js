const db = require("../models");
const Narrative = db.narrative;

// Retrieve all Narratives from the database.
exports.findAll = async (req, res) => {
  try {
    const data = await Narrative.findAll();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving narratives."
    });
  }
};
