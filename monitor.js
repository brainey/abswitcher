const io = require('socket.io-client');
//const broker = 'http://voicebox3.corp.lucid.lcl:3000';
const broker = 'http://10.100.11.36:3000';

var socket = io(broker);

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

