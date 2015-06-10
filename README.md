# sprity-dirs

Apply [sprity](https://www.npmjs.com/package/sprity) to multiple directories and generate seperate sprite and css for each directory.

## Usage

```javascript
var makeSprites = require('sprity-dirs');
var gulp = require('gulp');
var path = require('path');
var sprity = require('sprity');

gulp.task(
    'sprites',
    makeSprites('sp/*/src', function (dir) {
        var out = path.dirname(dir);
        return {
            out: out
            , prefix: 'sp-' + path.basename(out)
            , style: './index.css'
            , name: path.basename(out)
            , cssPath: '.'
        };
    }, sprity)
);

```

### cb = makesprites(dirPattern, getOptsForEachDir, sprity)

* **dirPattern**: Pattern used by [xglob](https://www.npmjs.com/package/xglob) to locate the directories, each corresponding to a sprite with all pics under it. Actually, anything that matches the pattern but not a directory will be ignored.
* **getOptsForEachDir**: *Function* Receives the dir path, and should return a [sprity option](https://github.com/sprity/sprity#options) object to generate the sprite. No need to specify `src`.
* **sprity**: The sprity instance.
* **cb**: *Function* The callback to begin sprite creation, which returns a promise.

## Example

Files before sprity:

```
⌘ tree .
.
├── dir.js
└── sp
    ├── delivery
    │   └── src
    │       ├── address_36.png
    │       ├── mobile_36.png
    │       ├── taketime_36.png
    │       └── user_36.png
    └── icon
        └── src
            ├── cart_36.png
            ├── category_36.png
            ├── checked_40.png
            ├── close_30.png
            ├── disable_40.png
            ├── failure_66.png
            ├── message_30.png
            ├── success_66.png
            └── unchecked_40.png

5 directories, 14 files
```

dir.js:

```javascript
var sprity = require('sprity');
var make = require('sprity-dirs');
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
```

output:

```
⌘ node dir.js
done
```

Files after sprity:

```
⌘ tree .
.
├── dir.js
└── sp
    ├── delivery
    │   ├── delivery.png
    │   ├── index.css
    │   └── src
    │       ├── address_36.png
    │       ├── mobile_36.png
    │       ├── taketime_36.png
    │       └── user_36.png
    └── icon
        ├── icon.png
        ├── index.css
        └── src
            ├── cart_36.png
            ├── category_36.png
            ├── checked_40.png
            ├── close_30.png
            ├── disable_40.png
            ├── failure_66.png
            ├── message_30.png
            ├── success_66.png
            └── unchecked_40.png

5 directories, 18 files
```

