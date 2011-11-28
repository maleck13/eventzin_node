/** User Model **/
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var User = new Schema(
{
    username    :   {type:String, index: true},
    password    :   {type:String},
    email       :   {type:String, index:true},
    facebook    :   {type:String},
    twitter     :   {type:String},
    role        :   {type:String}
    }
);


User.statics.findByUsername = function(uname,callback){
  return this.findOne().where("username", uname).run(callback);  
};
  
  
User.statics.findByEmail=function(emailAddress, callback){
  return this.findOne().where("email",emailAddress).run(callback);  
}; 

var ACL = require('../lib/Acl');

var Auth = function(user,res,authedCallback,notAuthedCallback){
    
    if(user){
        
        user.role  = (user.role)?user.role: "guest";
     ACL.checkAcl(res,user.role, function(){
         //allowed
         authedCallback(null,user);
     },function(){
         //failed
         notAuthedCallback("not authed", null);
     });   
     
    }else{
        notAuthedCallback("no user",null);
    }
    
    
};

module.exports = exports = User;
exports.auth = Auth;