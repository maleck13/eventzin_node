var  db  = require("../models").db;

require("../util");  

var user = db.models.User;

var UserController = {
    
    registerAction  :   function(req,res){
        console.log(req.method);
        var errors = [];
        if(req.method == "POST"){
            console.log("post");
            if(! req.body.email.contains("@")){
                res.redirect("/user/register", 301)
            }
            var saveUser = new user();
            saveUser.username = req.body.username;
            saveUser.password = req.body.password;
            saveUser.email = req.body.email;
            saveUser.role = "member";
            console.log(saveUser);
            saveUser.save();
            res.send("saved");
        }else{
            res.render("user/register",{title:"register account",'errors':errors});
        }
    },
    
    loginAction     :   function(req,res){
      if(req.body.username && req.body.password){
          user.findByUsername(req.body.username,function(err,data){
              
              console.log(data);
              if(data.password == req.body.password){
                  console.log("passsword = "+ data.password + "sent = "+req.body.password);
                  req.session.loggedin = true;
                  req.session.user = data;
                  res.redirect("/", 301);
              }else{
                  console.log("password wrong");
                  res.render("user/login",{title:"sign in",errors:[]});
              }
          });
      }else{
          res.render("user/login",{title:"sign in"});
      }  
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
            user.findByEmail(req.body.email,function(err,data){
                if(!err && ! data){
                    res.send({available:true});
                }else{
                    res.send({available:false});
                }
            });
        }else{
            res.send("");
        }
    }
    
    
};

module.exports = UserController;
