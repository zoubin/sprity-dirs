#!/usr/bin/env node
var sprity = require('..');

var argv = process.argv.slice(2);

var targetDir = argv.pop() || process.cwd();
var source = argv;
if (!source.length) {
    console.log('You should specify the source directory.')
    process.exit(-1);
}

sprity(source, targetDir)()
.then(function () {
    console.log('success!');
}, function (err) {
    console.log('Error', err.message);
    process.exit(-1);
})
