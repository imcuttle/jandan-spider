/**
 * Created by Yc on 2016/6/30.
 */

var net = require('net');
var http = require('http');
var header = require('fs').readFileSync('./header.txt').toString();
var gn = function (path,callback) {
    http.request(
        {
            headers : {
                Host: "jandan.net",
                Connection: "keep-alive",
                "Cache-Control": "max-age=0",
                Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                "Upgrade-Insecure-Requests": 1,
                "User-Agent": "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36",
                Referer: "http://jandan.net/v",
                "Accept-Language": "zh-CN,zh;q=0.8",
                "Cookie": "4036050675=a212EaZdVTtGmJU%2FQ44CpU9i5IZP2Ljr0I0Eg%2B3iGMA; PHPSESSID=i0kp1fea7ri18thb82r66fmig1; _ga=GA1.2.330681373.1467287790; gif-click-load=off; nsfw-click-load=off; 4036050675=4fbeVaLEoaUa6qhYEnwK6xvWxtZfUjFfUFD31YbeyQ; jdna=596e6fb28c1bb47f949e65e1ae03f7f5#1467383943629; Hm_lvt_fd93b7fb546adcfbcf80c4fc2b54da2c=1467287791,1467300607,1467374084,1467377139; Hm_lpvt_fd93b7fb546adcfbcf80c4fc2b54da2c=1467383944; bad-click-load=off"
            },
            hostname: "jandan.net",
            path: path
        },
        function (res) {
            var html = '';
            res.setEncoding('utf-8');
            res.on('data',function (chunk) {
                html+=chunk;
            });
            res.on('end',function () {
                callback(html);
            })
        }
    ).end();
};
var fn = function (path,callback) {
    const socket = net.createConnection(80,'jandan.net');
    socket.write(
        'GET '+path+' HTTP/1.1\r\n'+
        header
    );
    // socket.setTimeout(4000,function () {
    //     socket.end();
    // });
    socket.setEncoding('utf-8');
    var html = '';
    socket.on('data',function (chunk) {
        html+=chunk;
    });

    socket.on('end',function () {
        callback(html);
    });
}

module.exports = gn;

