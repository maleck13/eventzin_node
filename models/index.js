var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , db   = mongoose.connect("mongodb://localhost/eventzin");
  
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