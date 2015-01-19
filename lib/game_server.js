/**
 * Created by laura on 17.01.15.
 */
var socketio = require('socket.io');

exports.listen = function (server) {

    io = socketio.listen(server);

    console.log('export');

    io.sockets.on('connection', function (socket) {
        console.log('a user connected');

        socket.on('message', function (message) {
            console.log('Message from client: ' + message);
            socket.emit('sendPrivateMsg', {answer: 'ciao, user', from: 'server'});
        });

        socket.on('canvasMessage', function (message) {
            console.log('Message from client: ' + message);
            socket.emit('answerCanvas', {answer: 'you clicked the canvas!', from: 'server'});
        });

    });

    io.sockets.on('disconnect', function () {
        console.log('a user disconnected');
    });


}