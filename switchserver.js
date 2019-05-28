const express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/abswitch.html');
});

io.on('connection', function(socket){
  socket.on('switch', function(msg){
    io.emit('switch', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
