var express = require('express'),
    fs      = require('fs'),
    app     = express(),
    eps     = require('ejs'),
    morgan  = require('morgan');

Object.assign=require('object-assign');

app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'));

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

const resource_server = process.env.NMV_DEMO_RESOURCE_SERVER;
if(resource_server === undefined) {
  throw "Error: Resource server undefined. (Is NMV_DEMO_RESOURCE_SERVER set in the environment?)";
}

app.get('/bundle.js', function (req, res) {
  res.sendFile(__dirname + '/dist/bundle.js');
});

app.get('/', function (req, res) {
  res.render('index.html', { config: { resource_server: resource_server } });
});


// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app;
