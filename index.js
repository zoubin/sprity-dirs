var fs = require('fs');
var path = require('path');
var glob = require('xglob');
var mix = require('util-mix');
var promisify = require('node-promisify');
var filter = require('array-promise-filter');

module.exports = Sprity;

function Sprity(pattern, getOpts, sprity) {
    return function () {
        return glob(pattern)
            .then(filterDirs)
            .then(getSpritesOpts)
            .then(promisify(sprityArray));
    }

    function filterDirs(files) {
        return filter(files, promisify(isDir));
    }

    function getSpritesOpts(dirs) {
        return dirs.map(function (dir) {
            var opts = getOpts(dir);
            var extensions = opts.extensions || '.png';
            if (Array.isArray(extensions)) {
                extensions = '{' + extensions.join(',') + '}';
            }
            return mix(opts, { src: path.resolve(dir, '*' + extensions) });
        });
    }

    function sprityArray(opts, cb) {
        if (!Array.isArray(opts)) {
            opts = [opts];
        }
        (function next(i) {
            if (!opts[i]) {
                return cb();
            }
            sprity.create(opts[i], function () {
                next(++i);
            });
        })(0);
    }

}

function isDir(file, cb) {
    fs.stat(file, function (err, stats) {
        if (err || !stats.isDirectory(file)) {
            return cb(true);
        }
        cb(null, file);
    });
}
