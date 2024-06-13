const db = require("../models");
const Category = db.category;
const Op = db.Sequelize.Op;

// Create and Save a new Category
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.name) {
    return res.status(400).send({
      message: "Name cannot be empty!"
    });
  }

  // Convert name to lowercase
  const name = req.body.name.toLowerCase();

  try {
    // Try to find or create the category
    const [category, created] = await Category.findOrCreate({
      where: { name: name },
      defaults: { name: name, isInUse: true }
    });

    if (!created) {
      // Category already exists, update isInUse to true
      category.isInUse = true;
      await category.save();
      return res.send(category);
    }

    // If created, return the newly created category
    res.send(category);

  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Category."
    });
  }
};

// Retrieve all Categories from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Category.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories."
      });
    });
};

// Find a single Category with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Category.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Category with id = ${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Category with id = " + id
      });
    });
};

// Update a Category by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Category.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Category was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Category with id = ${id}. Maybe Category was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Category with id = " + id
      });
    });
};

// Delete a Category with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Category.update({ isInUse: false }, {
    where: { id: id }
  })
    .then(num => {
      if (num[0] === 1) {  // num is an array with the number of affected rows in the first element
        res.send({
          message: "Category was marked as not in use successfully!"
        });
      } else {
        res.send({
          message: `Cannot mark Category with id = ${id} as not in use. Maybe Category was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not mark Category with id = " + id + " as not in use"
      });
    });
};


// Delete all Categories from the database.
exports.deleteAll = (req, res) => {
  Category.update({ isInUse: false }, {
    where: {},
    returning: true  // Ensure the updated rows are returned (optional, based on dialect)
  })
    .then(nums => {
      const numAffectedRows = nums[0];  // numAffectedRows is the number of affected rows
      res.send({ message: `${numAffectedRows} Categories were marked as not in use successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while marking all categories as not in use."
      });
    });
};

