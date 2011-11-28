
/**
 * Module dependencies.
 */
require.paths.unshift('./node_modules');
var express     = require('express')
  , db          = require("./models").db
  , MemoryStore = require('express/node_modules/connect').session.MemoryStore;


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

var Controllers = require("./controllers");
 
// Index Home Page Route

app.get('/', Controllers.IndexController.indexAction);

//Events Routes
app.get("/:county/event/list", Controllers.EventController.list);
app.get("/:county/event/list/:type", Controllers.EventController.list);
app.get("/:county/event/show/:id",Controllers.EventController.show);
app.get("/:county/event/show/:id/:type",Controllers.EventController.show);
app.get("/event/add",Controllers.EventController.addEvent);
app.post("/event/add",Controllers.EventController.saveEvent);
app.get("/event/delete/:id",Controllers.EventController.deleteEvent);

// User Routes
app.all("/user/register",Controllers.UserController.registerAction);
app.post("/user/checkUsername",Controllers.UserController.checkUsername);
app.post("/user/checkEmail",Controllers.UserController.checkEmail);
app.all("/user/login",Controllers.UserController.loginAction);



var port = (process.env.VMC_APP_PORT || 3000);
app.listen(port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
