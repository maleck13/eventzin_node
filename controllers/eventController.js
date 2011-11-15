var  db  = require("../models").db;

require("../util");  

var event = db.models.Event;

var expressAuth  = require('express').basicAuth;


var EventController= {
    
    addEvent:function(req,res){
        
        res.render("add",{
            title:"Add Event"
        });
        
    },
    show:function(req,res){
        if(event && req.params.id){
            event.findOne({
                _id:req.params.id
            },function(err,data){
                if(data){
                    console.log("showing event");
                    (req.params.type == "json")
                    ?res.send(data)
                    :res.render("show",{
                        title:data.title,
                        post:data
                    });
                }else{
                    res.send("error",404)
                }
            ; 
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
            var longlat = req.body.county;
            var county = null;
            if(typeof longlat == "string"){
                longlat = longlat.split(",");
                console.log("longlat length "+ longlat.length);
                if(longlat.length == 3){
                    longLat.lat = longlat[0];
                    longLat.lon = longlat[1];
                    county = longlat[2];
                }
            }
            var toSave = new event();
            toSave.title = req.body.title;
            toSave.content = req.body.content;
            toSave.startdate = new Date(req.body.startdate);
            toSave.enddate  = new Date(req.body.enddate);
            toSave.county = county;
            toSave.longlat = longLat;
            toSave.save(function(err,suc){
                if(suc){
                    console.log(suc);
                    res.redirect("/"+toSave.county+"/event/list", 301);
                }else{
                    console.log("failed "+err);
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


exports.EventController = EventController;