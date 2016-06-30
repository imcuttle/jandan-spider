/**
 * Created by Yc on 2016/6/30.
 */

var fs = require('fs');

module.exports = function (filename,readable) {
    var file = fs.createWriteStream(filename);
    file.on('error',function () {
        file.end()
    })
    readable.pipe(file);
};