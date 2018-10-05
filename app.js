
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , bodyParser = require('body-parser')
  , favicon = require('serve-favicon')
  , logger = require('morgan')
  , methodOverride = require('method-override')
  , bit = require('./utils/bitcoinData.js');
var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));


if (app.get('env') == 'development') {
	app.locals.pretty = true;
}

app.get('/', routes.index);

app.get("/getExchangeRate", (req, res, next) => {
  bit.getExchangeRate()
  .then(function(rate){
    res.json(rate)
  }).catch(error => {
    console.log(error);
  });

});

app.get("/getHistoricalData", (req, res, next) => {
  bit.getHistoricalData()
    .then(function(data) {
      // console.log(data);
      res.json(data);
    }).catch(error => {
      console.log(error);
    });
});



http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
