var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
/*county model*/

var County = new Schema({
    county      :   {type:String,index:true}
    ,longlat    :   {lon:Number,lat:Number}
});

County.statics.findByLongLat = function(longlat,callback){
    return this.find().where("longlat.lon").eq(longlat.lon).where("longlat.lat", longlat.lat).run(callback);
}


module.exports = exports = County;