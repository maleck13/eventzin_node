var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
  
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

/*

*/
  
Event.pre('save',function(next){
  
  var errors = [];
  console.log("I was called first before save");
  if(this.title.length < 20)
    errors[errors.length] = {field:"title",message:"title invalid"};
  
  if(errors.length > 0){
      var error = new Error("Invalid Input");
      error.errors = errors;
      next(error);
   }
   next();
   
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

module.exports = exports = Event;