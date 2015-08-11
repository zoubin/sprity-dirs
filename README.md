# sprity-dirs

Apply [sprity](https://www.npmjs.com/package/sprity) to multiple directories and generate seperate sprite and css for each directory.

## Example

```javascript
var sprityDir = require('sprity-dirs');
sprityDir('src/*', 'build')
  .then(function () {
    console.log('done');
  })
  .catch(function (er) {
    console.log(er);
  })
;
```

```javascript
var sprityDir = require('sprity-dirs');
var opts = {
  to: 'build'
};
sprityDir('src/*', opts)
  .then(function () {
    console.log('done');
  })
  .catch(function (er) {
    console.log(er);
  })
;
;
```

```javascript
var sprityDir = require('sprity-dirs');
var path = require('path');
sprityDir('src/*', function (dir) {
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
```

```
⌘ tree src/
src/
├── delivery
│   ├── address_36.png
│   ├── mobile_36.png
│   ├── taketime_36.png
│   └── user_36.png
└── icon
    ├── cart_36.png
    ├── category_36.png
    ├── checked_40.png
    ├── close_30.png
    ├── disable_40.png
    ├── failure_66.png
    ├── message_30.png
    ├── success_66.png
    └── unchecked_40.png
```

After `node dir.js`:

```
⌘ tree build/
build/
├── delivery
│   ├── delivery.png
│   └── index.css
└── icon
    ├── icon.png
    └── index.css
```

## Api Usage

### sprityDir(dirPattern, opts)

Returns a promise.


#### dirPattern

Type: `String`, `Array`

Pattern used by [xglob](https://www.npmjs.com/package/xglob) to locate the directories,
each corresponding to a sprite with all pics in it.
Actually, anything that matches the pattern but not a directory will be ignored.

#### opts

Type: `Function`, `Object`, `String`

When `Function`, it receives the dir path, and should return a [sprity option](https://github.com/sprity/sprity#options) object to generate the sprite. No need to specify `src`.


When `String`, it indicates the directory where all the output sprites directories lie.

When `Object`, it should be [sprity option](https://github.com/sprity/sprity#options) common for all sprites, with the following default values:

* `out`. For each sprite, it will be `path.resolve(options.to, dirName)`
* `prefix`. `sp-{dirName}`
* `style`. `./index.css`
* `name`. `{dirname}`
* `cssPath`. `.`

## Command Line Usage

Right now you can only specify the source directories and the output root.

```bash
npm i sprity-dirs -g
sprity-dirs src/* build
```
