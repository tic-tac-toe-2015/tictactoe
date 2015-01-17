/**
 * Created by laura on 17.01.15.
 */
var socketio = require('socket.io');

exports.listen = function (server) {

    io = socketio.listen(server);

    console.log('export');

    io.sockets.on('connection', function (socket) {
        console.log('a user connected');
    });

    io.sockets.on('disconnect', function (socket) {
        console.log('a user disconnetted');
    });

}