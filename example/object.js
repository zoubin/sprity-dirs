var sprity = require('..');
var opts = {
  to: 'build'
};
sprity('src/*', opts)
  .then(function () {
    console.log('done');
  })
  .catch(function (er) {
    console.log(er);
  })
;
