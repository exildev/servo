var five = require("johnny-five");
var board = new five.Board();
var http = require('http');
var http_serv = http.createServer();
var io = require('socket.io')(http_serv);


board.on("ready", function() {
    var servo = new five.Servo(10);

    this.repl.inject({
        servo: servo
    });
    io.on('connection', function(socket) {
        console.log('new connection');
        socket.on('angle', function (a) {
            servo.to( a );
        });
    });
    //servo.sweep();
});

http_serv.listen(8001, function () {
    console.log('io run');
});
