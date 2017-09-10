var cors = require('cors');
var express = require('express');

var app = express();
var port = process.env.PORT || 8080;

require('./app/routes')(app, {});

app
  .use(cors())
  .listen(port, function() {
    console.log('API Magic happening on port ' + port);
  });
