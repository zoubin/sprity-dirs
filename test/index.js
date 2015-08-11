var test = require('tap').test;
var sprityDirs = require('..');
var sprity = require('sprity');
var path = require('path');
var promisify = require('node-promisify');
var fs = require('fs');
var del = promisify(require('del'));

var fixtures = path.resolve.bind(path, __dirname, '..', 'example');
var src = fixtures.bind(null, 'src');
var build = fixtures.bind(null, 'build');
var expect = fixtures.bind(null, 'expect');
var sprites = require('xglob').glob.sync('*', { cwd: src() });
var create = promisify(sprity.create.bind(sprity));
var plans = sprites.length * 2;

test('sprityDir(pattern, dest)', function(t) {
  t.plan(plans);

  sprityDirs(src('*'), build())
    .then(function () {
      return createExpect(sprites.map(function (name) {
        return {
          style: './index.css',

          name: name,
          src: src(name, '*.png'),
          out: expect(name),
          prefix: 'sp-' + name,
          cssPath: '.',
        };
      }));
    })
    .then(compare.bind(null, '.css', t))
    .then(clean)
    .catch(function (err) {
      t.error(err);
    });
});

test('sprityDir(pattern, options)', function(t) {
  t.plan(plans);

  var opts = {
    to: build(),
    processor: 'sass',
    style: './index.scss',
  };
  sprityDirs(src('*'), opts)
    .then(function () {
      return createExpect(sprites.map(function (name) {
        return {
          processor: 'sass',
          style: './index.scss',

          name: name,
          src: src(name, '*.png'),
          out: expect(name),
          prefix: 'sp-' + name,
          cssPath: '.',
        };
      }));
    })
    .then(compare.bind(null, '.scss', t))
    .then(clean)
    .catch(function (err) {
      t.error(err);
    });
});

function createExpect(options) {
  var ret = Promise.resolve();
  options.forEach(function (opts) {
    ret = ret.then(function () {
      return create(opts);
    });
  });
  return ret;
}

function compare(ext, t) {
  sprites.forEach(function (name) {
    t.same(
      fs.readFileSync(build(name, 'index' + ext)),
      fs.readFileSync(expect(name, 'index' + ext))
    );
    t.same(
      fs.readFileSync(build(name, name + '.png')),
      fs.readFileSync(expect(name, name + '.png'))
    );
  });
}

function clean() {
  return del(build())
    .then(function () {
      return del(expect());
    });
}

