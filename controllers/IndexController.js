
var db  = require("../models").db;
var county = db.models.County;
var User = db.models.User;
var Auth = require("../models/User").auth;

function IndexController(){
    
    
    
}



IndexController.prototype.indexAction = function(req, res){
    
    var data = {};
   
        Auth(req.session.user,"IndexController.indexAction",function(err,user){
        //is authed 
            
            data.secret = "welcome "+user.username;
            res.render("index",{title:"eventzin social event discovery",counties:data,user:req.session.user});
        },function(){
        //no authed
            data.secret = " you do not have access to this page ";
            res.render("index",{title:"eventzin social event discovery",counties:data,user:null});
        });
    
    
};

module.exports = new IndexController();