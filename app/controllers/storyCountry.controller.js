const db = require("../models");
const StoryCountry = db.storyCountry;
const { Op } = db.Sequelize;

// Create and Save a new StoryCountry
exports.create = async (req, res) => {
  try {
    // Validate request
    if (!req.body.name) {
      return res.status(400).send({ message: "Name cannot be empty!" });
    }

    // Convert name to lowercase
    const name = req.body.name.toLowerCase();

    // Try to find or create the story country
    const [storyCountry, created] = await StoryCountry.findOrCreate({
      where: { name: name },
      defaults: { name: name, isInUse: true }
    });

    if (!created) {
      // StoryCountry already exists, update isInUse to true
      storyCountry.isInUse = true;
      await storyCountry.save();
      return res.send(storyCountry);
    }

    // If created, return the newly created story country
    res.send(storyCountry);

  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the StoryCountry."
    });
  }
};

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

// Find a single StoryCountry with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await StoryCountry.findByPk(id);
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({ message: "StoryCountry not found" });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving StoryCountry with id=" + id
    });
  }
};

// Update a StoryCountry by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const [number] = await StoryCountry.update(req.body, {
      where: { id: id }
    });
    if (number === 1) {
      res.send({ message: "StoryCountry was updated successfully." });
    } else {
      res.send({
        message: `Cannot update StoryCountry with id=${id}. Maybe StoryCountry was not found or req.body is empty!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating StoryCountry with id=" + id
    });
  }
};

// Delete a StoryCountry with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const number = await StoryCountry.update({ isInUse: false }, {
      where: { id: id }
    })
    if (number === 1) {
      res.send({ message: "StoryCountry was deleted successfully!" });
    } else {
      res.send({
        message: `Cannot delete StoryCountry with id=${id}. Maybe StoryCountry was not found!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete StoryCountry with id=" + id
    });
  }
};

// Delete all StoryCountries from the database.
exports.deleteAll = async (req, res) => {
  try {
    const number = await StoryCountry.update({ isInUse: false }, {
      where: {},
      returning: true  // Ensure the updated rows are returned (optional, based on dialect)
    })
    res.send({ message: `${number} StoryCountries were deleted successfully!` });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all StoryCountries."
    });
  }
};
