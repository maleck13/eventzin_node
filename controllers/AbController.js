/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



function AbController(){
    this.name = "AbMe";
    console.log("constructed");
}


AbController.prototype.auth = function(){
  console.log("called auth name = "+this.name);
  if(this.name == "AbMe")
      return true;
  else
      return false;
  
};



exports.AbController = AbController;
