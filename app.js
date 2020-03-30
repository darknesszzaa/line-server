let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let engines = require('consolidate');
const routes = require('./src/routes/index');
let path = require('path');
const api = '/api/v1';

app.use(require('cors')());

app.set('views', __dirname + '/src/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const directory = __dirname + '/src/views/signin.html';
console.log(directory)
app.get('/', function (req, res) {
  res.sendFile('/', { root: directory });
});

const directoryGoogle = __dirname + '/src/views/googlea5e8055fa0f2b521.html';
app.get('/googlea5e8055fa0f2b521.html', function (req, res) {
  res.sendFile('/', { root: directoryGoogle });
});

app.use(api, routes);
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'));
});

module.exports = app;
