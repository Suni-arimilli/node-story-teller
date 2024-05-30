const db = require("../models");
const Configuration = db.configuration;

// Retrieve all Configurations from the database.
exports.findAll = async (req, res) => {
  try {
    const data = await Configuration.findAll();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving configurations."
    });
  }
};

