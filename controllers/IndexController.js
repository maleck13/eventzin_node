
var db  = require("../models").db;
var county = db.models.County;

function IndexController(){
    
    
    
}



IndexController.prototype.indexAction = function(req, res){
    county.find(function(err,data){
     res.render("index",{title:"eventzin social event discovery",counties:data});
    })
};

exports.index = new IndexController();