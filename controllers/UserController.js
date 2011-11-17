var UserController = {
    
    registerAction  :   function(req,res){
        console.log(req.method);
        if(req.method == "POST"){
            console.log("post");
            res.send(req.body);
        }else{
            res.render("user/register",{title:"register account"});
        }
    },
    loginAction     :   function(req,res){
        
    },
    signoutAction   :   function(req,res){
        
    }
    
};

exports.userController = UserController;