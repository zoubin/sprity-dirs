var sprity = require('..');
sprity('src/*', 'build')()
.then(function () {
    console.log('done');
})
.catch(function (er) {
    console.log(er);
})
;
