const express = require("express");
const app = express();
const cors = require("cors");
var port = process.env.PORT || 3000;

var bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get("/", (request, response) => {
  response.send(
    "Mail Template server: handles GET /mail?email=foobar@foobar.com&subject=My Subject&body=My Body"
  );
});

app.get("/mail", (request, response) => {
	
  var getMail = require('./mail.js');
  var retcode = getMail.mail(request, response);
});

app.get("/health", (request, response) => {
  var getHealth = require('./health.js');
  var retcode = getHealth.handlehealth(request, response);
});

app.get("/readiness", (request, response) => {
  var getReadiness = require('./readiness.js');
  var retcode = getReadiness.handlereadiness(request, response);
});

app.get("/liveness", (request, response) => {
  var getLiveness = require('./liveness.js');
  var retcode = getLiveness.liveness(request, response);
});


app.get("/custom/:templateid/:languageid", (request, response) => {
  var getCustom = require('./custom.js');
  var retcode = getCustom.custom(request, response);
});

app.post('/custom/:templateid/:languageid', function(request, response) {
    var user_id = request.body.id;
    var token = request.body.token;
    var geo = request.body.geo;
   
    console.log(request.body);
    
    var storeCustom = require('./custom.js');
    var retcode = storeCustom.storeCustom(request, response);

});

app.delete('/custom/:templateid/:languageid', function(request, response) {
    var user_id = request.body.id;
    var token = request.body.token;
    var geo = request.body.geo;
   
    console.log(request.body);
    
    var storeCustom = require('./custom.js');
    var retcode = storeCustom.delete(request, response);

});

app.get("/default/:templateid/:languageid", (request, response) => {
  var getDefault = require('./default.js');
  var retcode = getDefault.default(request, response);
});

app.post("/default/:templateid/:languageid", function(request, response) {
  var user_id = request.body.id;
  var token = request.body.token;
  var geo = request.body.geo;
   
  console.log(request.body);
   
  var storeDefault = require('./default.js');
  var retcode = storeDefault.storeDefault(request, response);

});

app.get("/metadata", (request, response) => {
  var getMetadata = require('./metadata.js');
  var retcode = getMetadata.metadata(request, response);
});

app.post('/metadata', function(request, response) {
   
  console.log(request.body);
    
  var storeMetadata = require('./metadata.js');
  var retcode = storeMetadata.storeMetadata(request, response);

});



const server = app.listen(port, err => {
  if (err) {
    return console.log("something bad happened", err);
  }

  console.log(`server is listening on ${port}`);
});

var signals = {
  SIGHUP: 1,
  SIGINT: 2,
  SIGTERM: 15
};

// Do any necessary shutdown logic for our application here
const shutdown = (signal, value) => {
  console.log("shutdown!");
  server.close(() => {
    console.log(`server stopped by ${signal} with value ${value}`);
    process.exit(128 + value);
  });
};

// Create a listener for each of the signals that we want to handle
Object.keys(signals).forEach(signal => {
  process.on(signal, () => {
    console.log(`process received a ${signal} signal`);
    shutdown(signal, signals[signal]);
  });
});

module.exports = app;
