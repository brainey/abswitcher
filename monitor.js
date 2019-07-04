#!/usr/bin/env node

const args = process.argv.slice(2);

if (args.length < 1) {
    console.error('Usgae: ' + __filename + ' SERVER_ADDRESS');
    process.exit(-1);
}
const address = args[0];

const io = require('socket.io-client');
const patch = require('socketio-wildcard')(io.Manager);


//const broker = 'http://voicebox3.corp.lucid.lcl:3000';
//const broker = 'http://127.0.0.1:3000';
//const broker = 'http://10.100.11.36:3000';

var socket = io(address);
patch(socket);

var connections = {};

socket.on('connect', () => {
    var id = socket.id;

    console.log('Connected: ', id, socket.connected);
    connections[id] = socket;

    socket.on('disconnect', () => {
        console.log('Disconnected: ', id, socket.disconnected);
        delete connections[id];
    });

    // socket.on('ping', () => {
    //     console.log('Ping message sent ...');
    // });
    // socket.on('pong', (ms) => {
    //     console.log('Pong response in ',ms,'ms');
    // });

    // socket.on('switchui', (mode) => {
    //     console.log('Change mode to ', mode);
    // });

    // socket.on('controls', (mode) => {
    //     console.log('controls change ', mode);
    // });

    socket.on('*', (packet) => {
        console.log('wildcard: ', packet);
    });
});
