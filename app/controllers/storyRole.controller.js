const db = require("../models");
const StoryRole = db.storyRole;
const { Op } = db.Sequelize;

// Create and Save a new StoryRole
exports.create = async (req, res) => {
  try {
    // Validate request
    if (!req.body.name) {
      return res.status(400).send({ message: "Name cannot be empty!" });
    }

    // Convert name to lowercase
    const name = req.body.name.toLowerCase();

    // Try to find or create the story role
    const [storyRole, created] = await StoryRole.findOrCreate({
      where: { name: name },
      defaults: { name: name, isInUse: true }
    });

    if (!created) {
      // StoryRole already exists, update isInUse to true
      storyRole.isInUse = true;
      await storyRole.save();
      return res.send(storyRole);
    }

    // If created, return the newly created story role
    res.send(storyRole);

  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the StoryRole."
    });
  }
};

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

// Find a single StoryRole with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await StoryRole.findByPk(id);
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({ message: "StoryRole not found" });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving StoryRole with id=" + id
    });
  }
};

// Update a StoryRole by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const [number] = await StoryRole.update(req.body, {
      where: { id: id }
    });
    if (number === 1) {
      res.send({ message: "StoryRole was updated successfully." });
    } else {
      res.send({
        message: `Cannot update StoryRole with id=${id}. Maybe StoryRole was not found or req.body is empty!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating StoryRole with id=" + id
    });
  }
};

// Delete a StoryRole with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const number = await StoryRole.update({ isInUse: false }, {
      where: { id: id }
    })
    if (number === 1) {
      res.send({ message: "StoryRole was deleted successfully!" });
    } else {
      res.send({
        message: `Cannot delete StoryRole with id=${id}. Maybe StoryRole was not found!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete StoryRole with id=" + id
    });
  }
};

// Delete all StoryRoles from the database.
exports.deleteAll = async (req, res) => {
  try {
    const number = await StoryRole.update({ isInUse: false }, {
      where: {},
      returning: true  // Ensure the updated rows are returned (optional, based on dialect)
    })
    res.send({ message: `${number} StoryRoles were deleted successfully!` });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all StoryRoles."
    });
  }
};
