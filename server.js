var express = require('express');
var http = require('http');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');

// setup the database
mongoose.connect('mongodb://localhost:27017/userINFO');

var IncidentsSchema = new mongoose.Schema({
  reference:  String,
  summary: String,
  current: String,
  logged: { type: Date, default: Date.now },
  end: String,
  min: String
});

var Incidents = mongoose.model('Incidents', IncidentsSchema);

var test = new Incidents({summary: "This is the test 0", 
                          current: "Awaiting Response", end: "SA", min:"0", reference: "1" });

var test1 = new Incidents({summary: "This is the test 1", 
                          current: "Awaiting Response", end: "SA", min:"0", reference: "2" });

var test2 = new Incidents({summary: "This is the test 2", 
                          current: "Awaiting Response", end: "SA", min:"0", reference: "3" });

var test3 = new Incidents({summary: "This is the test 3", 
                          current: "Awaiting Response", end: "SA", min:"0", reference: "4" });

//save it to MongoDB
test.save(function (err) {
  if (err) {
    return err;
  }
  else {
    console.log("work saved");
  }
});

test1.save(function (err) {
  if (err) {
    return err;
  }
  else {
    console.log("work saved");
  }
});

test2.save(function (err) {
  if (err) {
    return err;
  }
  else {
    console.log("work saved");
  }
});

test3.save(function (err) {
  if (err) {
    return err;
  }
  else {
    console.log("work saved");
  }
});

// PassportJS for login
passport.use(new LocalStrategy(
  function(username, password, done) {
    if (username === "admin" && password === "password") 
      return done(null, {name: "admin"});

    return done(null, false, { message: 'Incorrect username.' });
  }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

var auth = function(req, res, next){
  if (!req.isAuthenticated()) 
  	res.send(401);
  else
  	next();
};

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser()); 
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session({ secret: 'securedsession' }));
app.use(passport.initialize()); 
app.use(passport.session());   
app.use(app.router);

app.use(express.static(`${__dirname}/public`));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/loggedin', function(req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
});

// route to log in
app.post('/login', passport.authenticate('local'), function(req, res) {
  res.send(req.user);
});

app.get('/data', function (req, res) {
    if (req.user) {
      
      Incidents.find({}, function(err, data) {
        var IncidentsMap = {};

        var i = 0;

        data.forEach(function(datas) {
          IncidentsMap[i] = datas;

          i++;
        });

         var test = {
            message: 1,
            Incidents: IncidentsMap
          } 

        res.send(test);  
      });

      
    } else {
      var test = {
        message: 0
      } 

      res.send(test);
    }
});

// route to log out
app.post('/logout', function(req, res){
  req.logOut();
  res.send(200);
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
