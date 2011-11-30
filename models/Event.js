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
  , venue     : {type:String}
  
});

/*

*/
  
Event.pre('save',function(next){
  
  var errors = [];
  if(this.title.length < 10)
    errors[errors.length] = {field:"title",message:"title invalid"};
  if(this.content.length < 20 )
    errors[errors.length] = {field:"content",message:"the body of the event is required"};
  if(!this.startdate || this.startdate < new Date())  
    errors[errors.length] = {field:"startdate",message:" your start date must be in the future and cannot be bank"};
  if(!this.enddate || this.enddate < new Date())  
    errors[errors.length] = {field:"enddate",message:" your end date must be in the future and cannot be bank"};   
  
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