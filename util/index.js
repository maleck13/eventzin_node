Array.prototype.each = function(callback){
  if("function" != typeof callback)
      return this;
  
  for(var i =0; i < this.length; i ++){
      if("function" != typeof this[i])
        callback(this[i]);
  }
  return this;  
};





