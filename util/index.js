Array.prototype.each = function(callback){
  if("function" != typeof callback)
      return this;
  
  for(var i =0; i < this.length; i ++){
      if("function" != typeof this[i])
        callback(this[i]);
  }
  return this;  
};

String.prototype.contains = function(token){
    console.log("contains called with "+ typeof token);
    if("string" !== typeof token)
        return false;
    
    return (token.indexOf(token)!= -1);
}





