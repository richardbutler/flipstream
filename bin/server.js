var app, express;

express = require('express');

app = express.createServer();

app.configure(function() {
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express["static"]("" + __dirname + "/assets"));
  app.use(app.router);
});

app.get('/', function(req, res) {
  res.sendfile("" + __dirname + "/index.html");
});

app.listen(3000);

console.log('Listening on localhost:3000');
