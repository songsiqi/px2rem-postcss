'use strict';

var assert = require('assert');
var path = require('path');
var fs = require('fs');
var px2rem = require('..');
var postcss = require('postcss');
var autoprefixer = require('autoprefixer');

var opacity = function (css) {
  css.walkDecls(function (decl) {
    if (decl.prop === 'opacity') {
      decl.parent.insertAfter(decl, {
        prop: '-ms-filter',
        value: '"progid:DXImageTransform.Microsoft.Alpha(Opacity=' + (parseFloat(decl.value) * 100) + ')"'
      });
    }
  });
};

describe('postcss-px2rem', function () {

  it('[default] should output right rem file', function () {
    var srcPath = path.join(__dirname, 'source.css');
    var srcText = fs.readFileSync(srcPath, {encoding: 'utf8'});
    var outputText = postcss().use(px2rem({remUnit: 75})).process(srcText).css;
    var expectedText = fs.readFileSync(path.join(__dirname, 'dest.basic.css'), {encoding: 'utf8'});
    assert.equal(outputText, expectedText);
  });

  it('should get along well with other plugins', function () {
    var srcPath = path.join(__dirname, 'source.css');
    var srcText = fs.readFileSync(srcPath, {encoding: 'utf8'});
    var outputText = postcss()
      .use(autoprefixer({browsers: ['iOS >= 6', 'Android >= 2.3']}))
      .use(px2rem({remUnit: 75}))
      .use(opacity)
      .process(srcText).css;
    var expectedText = fs.readFileSync(path.join(__dirname, 'dest.multiple.css'), {encoding: 'utf8'});
    assert.equal(outputText, expectedText);
  });
});
