/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', {title: 'Express'})
};
exports.EventsController = require("../controllers/eventController");

//exports.eventController.list = exports.eventController.list;