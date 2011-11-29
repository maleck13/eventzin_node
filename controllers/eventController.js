var  db  = require("../models").db;
require("../util");  
var event = db.models.Event;

var EventController= {
    
    addEvent:function(req,res){
        if(req.session.user){
        var model = {};
        model.title = "Add Event";
        model.form = req.session.form || null;
        req.session.form = null;
          res.render("add",model);
        }else{
          res.redirect("/user/login");
        }
        
    },
    show:function(req,res){
        if(event && req.params.id){
            event.findOne({_id:req.params.id},
            function(err,data){
                if(data){
                    
                    (req.params.type == "json")
                    ?res.send(data)
                    :res.render("show",{
                        title:data.title,
                        post:data
                });
          }else{
                    res.send("error",404)
                } 
            });
        }
    },
    list:function(req,res){    
        if(event){
            if(! req.params.county){
                event.findAllByEndDateLessThan(new Date(),function(err,data){
                    console.log(data[0]);
                    if(req.params.type == "json")
                        res.send(data);
                    else{
                        res.render("list",{
                            posts:data,
                            title:"events"
                        });
                    }
                })
            }else{
                event.findAllByCountyAndEndDate(req.params.county, new Date,function(err,data){
                    if(req.params.type == "json")
                        res.send(data);
                    else{
                        res.render("list",{
                            posts:data,
                            title:"events"
                        });
                    }
                });
            }
        }else{
            res.send("no data");
        }
    },
    saveEvent:function(req,res){
        
        if(event){
            var longLat = {};
            var toSave = new event();
            var countySplit = req.body.county.split(",");
            longLat.lat = req.body.latitude || countySplit[0];
            longLat.lon = req.body.longitude || countySplit[1]; 
            toSave.longlat = longLat;
            toSave.title = req.body.title;
            toSave.county = countySplit[2];
            toSave.startdate = req.body.startdate;
            toSave.enddate = req.body.enddate;
            toSave.content = req.body.content;
            toSave.venue = req.body.venue || "";
            var that = this;
            toSave.save(function(err,suc){
                if(suc){
                    res.redirect("/"+toSave.county+"/event/list", 301);
                }else{
                      toSave.errors = err.errors;
                      eventForm = toSave;
                      req.session.form = toSave;
                      res.redirect("/event/add",301);
                }
            });
        }
    },
    deleteEvent:function(req,res){
        if(req.params.id && event){
            event.remove({
                _id:req.params.id
            },function(err,suc){
                if(suc){
                    res.redirect("/event/list", 301);
                }else{
                    res.send("could not delete");
                }
            })
        }else{
            res.send("could not delete no id");  
        }
    }
    
    
};


module.exports =  EventController;

