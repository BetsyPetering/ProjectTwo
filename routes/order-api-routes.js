//copied from week 14 activity 14 public/routes/post-api-routes.js

// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the orders
  app.get("/api/orders", function(req, res) {
    var query = {};
    if (req.query.customer_id) {
      query.CustomerId = req.query.customer_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Customer
    db.Order.findAll({
      where: query,
      include: [db.Customer]
    }).then(function(dbOrder) {
      res.json(dbOrder);
    });
  });

  // Get route for retrieving a single order
  app.get("/api/orders/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Customer
    db.Order.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Customer]
    }).then(function(dbOrder) {
      res.json(dbOrder);
    });
  });

  // ORDER route for saving a new order
  app.order("/api/orders", function(req, res) {
    db.Order.create(req.body).then(function(dbOrder) {
      res.json(dbOrder);
    });
  });

  // DELETE route for deleting orders
  app.delete("/api/orders/:id", function(req, res) {
    db.Order.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbOrder) {
      res.json(dbOrder);
    });
  });

  // PUT route for updating orders
  app.put("/api/orders", function(req, res) {
    db.Order.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbOrder) {
      res.json(dbOrder);
    });
  });
};
