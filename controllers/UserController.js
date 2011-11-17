var UserController = {
    
    registerAction  :   function(req,res){
        if(req.header("method") == "post"){
            console.log("post");
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