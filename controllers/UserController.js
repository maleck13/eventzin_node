var  db  = require("../models").db;

require("../util");  

var user = db.models.User;

var UserController = {
    
    registerAction  :   function(req,res){
        console.log(req.method);
        if(req.method == "POST"){
            console.log("post");
            var saveUser = new user();
            saveUser.username = req.body.username;
            saveUser.password = req.body.password;
            saveUser.email = req.body.email;
            console.log(saveUser);
            saveUser.save();
            res.send("saved");
        }else{
            res.render("user/register",{title:"register account"});
        }
    },
    loginAction     :   function(req,res){
        
    },
    signoutAction   :   function(req,res){
        
    },
    
    checkUsername : function(req,res){
       if(req.body.username){
           user.findByUsername(req.body.username,function(err,data){
               console.log(err,data);
               if(!err && !data){
                //available 
                res.send({available:true});
               }else{
                   //unavailable
                   res.send({available:false});
               }
               
           });
       }else{
           res.send("");
       }
    },
    
    checkEmail : function(req,res){
        if(req.body.email){
            
        }else{
            res.send("");
        }
    }
    
    
};

exports.userController = UserController;