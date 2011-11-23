/** User Model **/
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var User = new Schema(
{
    username    :   {type:String, index: true},
    password    :   {type:String},
    email       :   {type:String, index:true},
    facebook    :   {type:String},
    twitter     :   {type:String}
    }
);


User.statics.findByUsername = function(uname,callback){
  return this.findOne().where("username", uname).run(callback);  
};
  
  
User.statics.findByEmail=function(emailAddress, callback){
  return this.findOne().where("email",emailAddress).run(callback);  
};  


module.exports = exports = User;