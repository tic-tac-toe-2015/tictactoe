var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', function (req, res) {
    res.send(' This is a test ');
});


var server = app.listen(3000, function () {
    console.log('Listening on port %d', server.address().port);
});