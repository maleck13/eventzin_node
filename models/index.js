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




  
/event model/

var Event = new Schema({
    title     : {type: String, index: true}
  , content   : {type: String}
  , startdate : Date
  , enddate   : Date
  , creator   : Schema.ObjectId
  , longlat   : {lon:Number,lat:Number}
  , county    : {type:String, index:true}
  
});
  

Event.statics.findByTitle = function (title, callback) {
  return this.find({title: title}, callback);
}


Event.statics.deleteAllByTitle = function(title,callback){
    return this.remove({title:title},callback);
}


Event.statics.findOneByExample= function(ex,callback){
    return this.findOne(ex,callback);
}

Event.statics.findAllByEndDateLessThan = function(date,callback){
    return this.find().where("enddate").gte(date).run(callback)
}

Event.statics.findAllByCountyAndEndDate = function(county,end,callback){
    return this.find().where("enddate").gte(end).where("county", county).run(callback);
}

/*User model*/

var User = new Schema({
    username    :   {type:String,index:true},
    password    :   {type:String},
    email       :   {type:String}
});

/*county model*/

var County = new Schema({
    county      :   {type:String,index:true}
    ,longlat    :   {lon:Number,lat:Number}
});

County.statics.findByLongLat = function(longlat,callback){
    return this.find().where("longlat.lon").eq(longlat.lon).where("longlat.lat", longlat.lat).run(callback);
}



mongoose.model('Event', Event);
mongoose.model("County",County);

exports.db = mongoose;