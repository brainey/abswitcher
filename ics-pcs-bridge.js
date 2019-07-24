#!/usr/bin/env node

const [,, ... args] = process.argv

console.log(`Interior Controls Bridge to ProtoPie starting with args ${args}`);


const pcs_url = 'http://uxbuck-pcs:9981'
const ics_url = 'http://uxbuck-cntlr:3000/'


var io = require('socket.io-client');

console.log('Establishing link to ', pcs_url);
var pcs_socket = io(pcs_url,{'extraHeaders': {'Accept-Encoding': 'identity'}});

console.log('Establishing link to ', ics_url);
var ics_socket = io(ics_url,{forceNew: true, 'extraHeaders': {'Accept-Encoding': 'identity'}});

pcs_socket.on('connect', () => {
    var id = pcs_socket.id;
    console.log('Connection established to PCS: ', pcs_url, ' id ',  id);

    pcs_socket.on('disconnect', () => {
        console.log('Disconnecting from PCS: ', id, pcs_socket.disconnected);
    });

});

ics_socket.on('connect', () => {
    var id = ics_socket.id;
    console.log('Connected established to ICS: ', ics_url, ' id ', id);
    
    ics_socket.on('disconnect', () => {
        console.log('Disconnecting from ICS: ', id, ics_socket.disconnected);
    });

    ics_socket.on('controls', (mode) => {
        var data = { messageId: mode.name, value: mode.value.toString() };
        console.log('bridge controls: ', mode, ' to ', data);
        pcs_socket.emit('ppMessage', data);
    });

});

              

