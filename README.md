# postcss-px2rem

This is a [postcss](https://www.npmjs.com/package/postcss) plugin of [px2rem](https://www.npmjs.com/package/px2rem).

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Downloads][downloads-image]][downloads-url]

[npm-image]: https://img.shields.io/npm/v/postcss-px2rem.svg?style=flat-square
[npm-url]: https://npmjs.org/package/postcss-px2rem
[travis-image]: https://img.shields.io/travis/songsiqi/px2rem-postcss.svg?style=flat-square
[travis-url]: https://travis-ci.org/songsiqi/px2rem-postcss
[downloads-image]: http://img.shields.io/npm/dm/postcss-px2rem.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/postcss-px2rem

## Usage

### Node

```
var postcss = require('postcss');
var px2rem = require('postcss-px2rem');
var originCssText = '...';
var newCssText = postcss().use(px2rem({remUnit: 64})).process(originCssText).css;
```

**Please see [px2rem](https://www.npmjs.com/package/px2rem) for more information about the features and usage of px2rem.**

### Gulp

```
npm install gulp-postcss
```

```
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var px2rem = require('postcss-px2rem');

gulp.task('default', function() {
    var processors = [px2rem({remUnit: 64})];
    return gulp.src('./src/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dest'));
});
```

### Webpack

```
npm install postcss-loader
```

```
var px2rem = require('postcss-px2rem');

module.exports = {
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style-loader!css-loader!postcss-loader"
            }
        ]
    },
    postcss: function() {
        return [px2rem({remUnit: 64})];
    }
}
```

### Grunt

```
npm install grunt-postcss
```

```
module.exports = function(grunt) {
    grunt.initConfig({
        postcss: {
            options: {
                processors: [
                    px2rem({remUnit: 64})
                ]
            },
            dist: {
                src: 'src/*.css',
                dest: 'build'
            }
        }
    });
    grunt.loadNpmTasks('grunt-postcss');
    grunt.registerTask('default', ['postcss']);
}
```

## Change Log

### 0.1.3

* Fix root node extend bug.

### 0.1.0

* First release.

## License

MIT
