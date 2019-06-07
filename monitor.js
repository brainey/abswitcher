const io = require('socket.io-client');

var socket = io('http://10.100.11.206:3000');

var connections = {};

socket.on('connect', () => {
  var id = socket.id;

  console.log('Connected: ', id, socket.connected);
  connections[id] = socket;

  socket.on('disconnect', () => {
    console.log('Disconnected: ', id, socket.disconnected);
    delete connections[id];
  });

  socket.on('switchui', (mode) => {
    console.log('Change mode to ', mode);
  });

});

