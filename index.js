var fs = require('fs');
var path = require('path');
var glob = require('xglob');
var mix = require('util-mix');
var promisify = require('node-promisify');
var filter = require('array-promise-filter');
var sprity = require('sprity');

module.exports = sprityDir;

function sprityDir(pattern, getOpts) {
  getOpts = typeof getOpts === 'function'
    ? getOpts
    : defaultOpts.bind(null, getOpts);
  return glob(pattern)
    .then(filterDirs)
    .then(getSpritesOpts.bind(null, getOpts))
    .then(promisify(sprityArray));
}

function getSpritesOpts(getOpts, dirs) {
  return dirs.map(function (dir) {
    var opts = getOpts(dir);
    var extensions = opts.extensions || '.png';
    if (Array.isArray(extensions)) {
      extensions = '{' + extensions.join(',') + '}';
    }
    return mix(opts, { src: path.resolve(dir, '*' + extensions) });
  });
}

function filterDirs(files) {
  return filter(files, promisify(isDir));
}

function isDir(file, cb) {
  fs.stat(file, function (err, stats) {
    if (err || !stats.isDirectory(file)) {
      return cb(true);
    }
    cb(null, file);
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

function defaultOpts(opts, dir) {
  var to = opts;
  if (typeof opts === 'object') {
    to = to && to.to;
  }
  if (typeof to !== 'string') {
    to = process.cwd();
  }
  var name = path.basename(dir);
  return mix({
    out: path.resolve(to, name),
    prefix: 'sp-' + name,
    style: './index.css',
    name: name,
    cssPath: '.',
  }, opts);
}
