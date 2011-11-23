
/**
 * Module dependencies.
 */
require.paths.unshift('./node_modules');
var express     = require('express')
  , routes      = require('./routes')
  , db          = require("./models").db
  , MemoryStore = require('express/node_modules/connect').session.MemoryStore;

/*
var county =  db.models.County;
var county = new county({county:"waterford",longlat:{lon:53.2323,lat:-7.234234}})
county.save();
*/

var app = module.exports = express.createServer();



// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
   app.use(express.cookieParser());
  app.use(express.session({ secret: "blahblah", store: new MemoryStore({ reapInterval:  60000 * 10 })}));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({dumpExceptions: true, showStack: true})); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});


//controllers

var eventController = require("./controllers/EventController").EventController;
var UserController  =   require("./controllers/UserController").userController;

 


// Routes


app.get('/', require("./controllers/IndexController").index.indexAction);
app.get("/:county/event/list", eventController.list);
app.get("/:county/event/list/:type", eventController.list);
app.get("/event/list/:type", eventController.list);
app.get("/event/list", eventController.list);
app.get("/:county/event/show/:id",eventController.show);
app.get("/event/show/:id/:type",eventController.show);
app.get("/event/add",eventController.addEvent);
app.post("/event/add",eventController.saveEvent);
app.get("/event/delete/:id",eventController.deleteEvent);
app.all("/user/register",UserController.registerAction);
app.post("/user/checkUsername",UserController.checkUsername);
app.post("/user/checkEmail",UserController.checkEmail);
app.all("/user/login",UserController.loginAction);



var port = (process.env.VMC_APP_PORT || 3000);
app.listen(port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
