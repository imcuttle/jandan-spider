/**
 * Created by Yc on 2016/6/30.
 */

var net = require('net');
var header = require('fs').readFileSync('./header.txt').toString();

module.exports = function (path,callback) {
    const socket = net.createConnection(80,'jandan.net');

    socket.write(
        'GET '+path+' HTTP/1.1\r\n'+
        header
    );

    socket.setEncoding('utf-8');
    socket.setTimeout(4000,function () {
        callback(html);
        console.error(new Error('Time OUT'));
        socket.end();
    });

    var html = '';
    socket.on('data',function (chunk) {
        html+=chunk;
    });

    socket.on('end',function () {
        console.log('disconnected from server');
    });
}

