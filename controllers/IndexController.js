
var db  = require("../models").db;
var county = db.models.County;
var User = db.models.User;
var Auth = require("../models/User").auth;

function IndexController(){
    
    
    
}



IndexController.prototype.indexAction = function(req, res){
    
    var data = {};
   
        
            res.render("index",{title:"eventzin social event discovery",counties:data,user:null});
        
    
    
};

module.exports = new IndexController();