/**
 * Created by Yc on 2016/6/30.
 */
var spider = require('./spider');
var download = require('./download');
var http = require('http');
var dir = 'f://jandan';

function run(i,low) {
    if(i<low) return;
    spider('/ooxx/page-'+i,function (html) {
        var images = [];
        html.replace(/<a.+?href="(http[^<>]+?sina.+?)".*?class="view_img_link".*?>[^<]+?<\/a>/g,function (m,c) {
            images.unshift(c);
        });
        var page = i;
        var proms = images.map((x,i,a)=>{
            // console.log(x);
            return new Promise((resolve,reject)=>{
                var req = http.get(x,function (res) {
                    res.on('error',function (err) {
                        console.error(err);
                        resolve('fail');
                    });
                    var filename = x.substr(x.lastIndexOf('/')+1);
                    download(dir+'/'+filename,res);
                    console.log('PAGE:'+page+'...'+filename+'...'+(i+1)+'/'+a.length);
                    resolve('done');
                }).end();
            });
        });
        Promise.all(proms)
            .then((values)=>{
                run(i-1,low);
            });
    });
}


//2302 - 1780
run(2034,2034);


process.on('uncaughtException', function (err) {
    console.error(err.stack);
    console.log("Node NOT Exiting...");
});



