var sprity = require('..');
var path = require('path');
sprity('src/*', function (dir) {
  var name = path.basename(dir);
  return {
    out: path.resolve(__dirname, 'build', name),
    prefix: 'sp-' + name,
    style: './index.css',
    name: name,
    cssPath: '.',
  };
})
.then(function () {
  console.log('done');
})
.catch(function (er) {
  console.log(er);
})
;
