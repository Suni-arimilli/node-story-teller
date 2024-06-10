const db = require("../models");
const Language = db.language;
const { Op } = db.Sequelize;

// Create and Save a new Language
exports.create = async (req, res) => {
  try {
    // Validate request
    if (!req.body.name) {
      return res.status(400).send({ message: "Name cannot be empty!" });
    }

    // Create a Language
    const language = {
      name: req.body.name
    };

    // Save Language in the database
    const data = await Language.create(language);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Language."
    });
  }
};

// Retrieve all Languages from the database.
exports.findAll = async (req, res) => {
  try {
    const data = await Language.findAll();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving languages."
    });
  }
};

// Find a single Language with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Language.findByPk(id);
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({ message: "Language not found" });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving Language with id=" + id
    });
  }
};

// Update a Language by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const [number] = await Language.update(req.body, {
      where: { id: id }
    });
    if (number === 1) {
      res.send({ message: "Language was updated successfully." });
    } else {
      res.send({
        message: `Cannot update Language with id=${id}. Maybe Language was not found or req.body is empty!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating Language with id=" + id
    });
  }
};

// Delete a Language with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const number = await Language.destroy({
      where: { id: id }
    });
    if (number === 1) {
      res.send({ message: "Language was deleted successfully!" });
    } else {
      res.send({
        message: `Cannot delete Language with id=${id}. Maybe Language was not found!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete Language with id=" + id
    });
  }
};

// Delete all Languages from the database.
exports.deleteAll = async (req, res) => {
  try {
    const number = await Language.destroy({
      where: {},
      truncate: false
    });
    res.send({ message: `${number} Languages were deleted successfully!` });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all languages."
    });
  }
};
