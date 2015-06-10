var sprity = require('sprity');
var make = require('..');
var path = require('path');

make('sp/*/src', function (dir) {
    var out = path.dirname(dir);
    return {
        out: out
        , prefix: 'sp-' + path.basename(out)
        , style: './index.css'
        , name: path.basename(out)
        , cssPath: '.'
    };
}, sprity)()
.then(function () {
    console.log('done');
})
.catch(function (er) {
    console.log(er);
})
;
