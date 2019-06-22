const express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var path = require('path');


var clients = {};

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.use(express.static(path.join(__dirname, '/public')));

io.on('connection', function(socket){
  clients[socket.id] = socket;

  console.log('a user connected: ', socket.id);
  console.log('number of clients: ', Object.keys(clients).length)

  socket.on('switchui', function(msg){
    console.log('switchui', msg);
    io.emit('switchui', msg);
  });

  socket.on('controls', function(msg){
    console.log('controls', msg);
    io.emit('controls', msg);
  });

  socket.on('disconnect', function(data) {
    console.log('socket disconnecting: ', socket.id);
    delete clients[socket.id];
    console.log('number of clients: ', Object.keys(clients).length)
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
