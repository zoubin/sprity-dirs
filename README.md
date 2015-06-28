# sprity-dirs

Apply [sprity](https://www.npmjs.com/package/sprity) to multiple directories and generate seperate sprite and css for each directory.

## Api Usage

dir.js

```javascript
var sprityDir = require('sprity-dirs');
sprityDir('src/*', 'build')()
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

### cb = sprityDir(dirPattern, getOptsForEachDir)

Returns a callback which returns a promise when called. So you can use it with `gulp`.

#### dirPattern

Type: `String`, `Array`

Pattern used by [xglob](https://www.npmjs.com/package/xglob) to locate the directories,
each corresponding to a sprite with all pics in it.
Actually, anything that matches the pattern but not a directory will be ignored.

#### getOptsForEachDir

Type: `Function`, `Object`, `String`

When `Function`, it receives the dir path, and should return a [sprity option](https://github.com/sprity/sprity#options) object to generate the sprite. No need to specify `src`.


When `String`, it indicates the directory where all the output sprites directories lie.

When `Object`, it should be [sprity option](https://github.com/sprity/sprity#options) common for all sprites, except the following:

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
