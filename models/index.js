var mongoose = require('mongoose')
, Schema = mongoose.Schema
, db   = null;
  
  
 
var generate_mongo_url = function(obj){
    obj.hostname = (obj.hostname || 'localhost');
    obj.port = (obj.port || 27017);
    obj.db = (obj.db || 'test');

    if(obj.username && obj.password){
        return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
    }
    else{
        return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
    }
};

if(process.env.VCAP_SERVICES){
    var env = JSON.parse(process.env.VCAP_SERVICES);
    var mongo = env['mongodb-1.8'][0]['credentials'];
    var mongourl = generate_mongo_url(mongo);
    db = mongoose.connect(mongourl);
}else{
    db = mongoose.connect("mongodb://localhost/eventzin")
}





mongoose.model('Event', require("./Event"));
mongoose.model("County",require("./County"));
mongoose.model("User",require("./User"));

exports.db = mongoose;