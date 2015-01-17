var express = require('express');

var app = express();

var server = app.listen(3000, function () {
    console.log('Listening on port %d', server.address().port);
});

app.use("/", express.static(__dirname + '/public'));

app.route('/')
    .get(function (req, res) {
        res.sendFile('/public/index.html');
    })
    .post(function (req, res) {
        res.send('Add something');
    })
    .put(function (req, res) {
        res.send('Update something');
    })
    .delete(function (req, res) {
        res.send('Got a DELETE request');
    })

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(400).send('bad request');
    res.status(404).send('resource not found');
    res.status(500).send('Something broke!');
});


