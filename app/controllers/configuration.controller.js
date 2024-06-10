const db = require("../models");
const Configuration = db.configuration;
const { Op } = db.Sequelize;

// Create and Save a new Configuration
exports.create = async (req, res) => {
  try {
    // Validate request
    if (!req.body.name) {
      return res.status(400).send({ message: "Name cannot be empty!" });
    }

    // Create a Configuration
    const configuration = {
      name: req.body.name
    };

    // Save Configuration in the database
    const data = await Configuration.create(configuration);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Configuration."
    });
  }
};

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

// Find a single Configuration with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Configuration.findByPk(id);
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({ message: "Configuration not found" });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving Configuration with id=" + id
    });
  }
};

// Update a Configuration by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const [number] = await Configuration.update(req.body, {
      where: { id: id }
    });
    if (number === 1) {
      res.send({ message: "Configuration was updated successfully." });
    } else {
      res.send({
        message: `Cannot update Configuration with id=${id}. Maybe Configuration was not found or req.body is empty!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating Configuration with id=" + id
    });
  }
};

// Delete a Configuration with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const number = await Configuration.destroy({
      where: { id: id }
    });
    if (number === 1) {
      res.send({ message: "Configuration was deleted successfully!" });
    } else {
      res.send({
        message: `Cannot delete Configuration with id=${id}. Maybe Configuration was not found!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete Configuration with id=" + id
    });
  }
};

// Delete all Configurations from the database.
exports.deleteAll = async (req, res) => {
  try {
    const number = await Configuration.destroy({
      where: {},
      truncate: false
    });
    res.send({ message: `${number} Configurations were deleted successfully!` });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all configurations."
    });
  }
};
