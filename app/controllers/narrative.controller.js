const db = require("../models");
const Narrative = db.narrative;
const { Op } = db.Sequelize;

// Create and Save a new Narrative
exports.create = async (req, res) => {
  try {
    // Validate request
    if (!req.body.name) {
      return res.status(400).send({ message: "Name cannot be empty!" });
    }

    // Convert name to lowercase
    const name = req.body.name.toLowerCase();

    // Try to find or create the narrative
    const [narrative, created] = await Narrative.findOrCreate({
      where: { name: name },
      defaults: { name: name, isInUse: true }
    });

    if (!created) {
      // Narrative already exists, update isInUse to true
      narrative.isInUse = true;
      await narrative.save();
      return res.send(narrative);
    }

    // If created, return the newly created narrative
    res.send(narrative);

  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Narrative."
    });
  }
};

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

// Find a single Narrative with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Narrative.findByPk(id);
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({ message: "Narrative not found" });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving Narrative with id=" + id
    });
  }
};

// Update a Narrative by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const [number] = await Narrative.update(req.body, {
      where: { id: id }
    });
    if (number === 1) {
      res.send({ message: "Narrative was updated successfully." });
    } else {
      res.send({
        message: `Cannot update Narrative with id=${id}. Maybe Narrative was not found or req.body is empty!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating Narrative with id=" + id
    });
  }
};

// Delete a Narrative with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const number = await Narrative.update({ isInUse: false }, {
      where: { id: id }
    })
    if (number === 1) {
      res.send({ message: "Narrative was deleted successfully!" });
    } else {
      res.send({
        message: `Cannot delete Narrative with id=${id}. Maybe Narrative was not found!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete Narrative with id=" + id
    });
  }
};

// Delete all Narratives from the database.
exports.deleteAll = async (req, res) => {
  try {
    const number = await Narrative.update({ isInUse: false }, {
      where: {},
      returning: true  // Ensure the updated rows are returned (optional, based on dialect)
    })
    res.send({ message: `${number} Narratives were deleted successfully!` });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all narratives."
    });
  }
};