const express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var path = require('path');

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.use(express.static(path.join(__dirname, '/public')));

io.on('connection', function(socket){
  socket.on('switchui', function(msg){
    io.emit('switchui', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
