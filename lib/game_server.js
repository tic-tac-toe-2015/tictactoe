/**
 * Created by laura on 17.01.15.
 */
var socketio = require('socket.io');

exports.listen = function (server) {

    io = socketio.listen(server);

    console.log('export');

    io.sockets.on('connection', function (socket) {
        console.log('a user connected');

        socket.on('canvasMessage', function (message) {
            console.log('Message from client: ' + message);
            socket.emit('answerCanvas', {answer: 'you clicked on the canvas!', from: 'server'});
        });

    });

    io.sockets.on('disconnect', function () {
        console.log('a user disconnected');
    });


}