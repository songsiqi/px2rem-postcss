'use strict';

var assert = require('assert');
var path = require('path');
var fs = require('fs');
var px2rem = require('..');
var cssmin = require('cssmin');
var postcss = require('postcss');
var autoprefixer = require('autoprefixer');

var opacity = function(css) {
    css.eachDecl(function(decl) {
        if (decl.prop === 'opacity') {
            decl.parent.insertAfter(decl, {
                prop: '-ms-filter',
                value: '"progid:DXImageTransform.Microsoft.Alpha(Opacity=' + (parseFloat(decl.value) * 100) + ')"'
            });
        }
    });
};

describe('postcss-px2rem', function() {

    it('[default] should output right rem file', function() {
        var srcPath = path.join(__dirname, 'source.css');
        var outputPath = path.join(__dirname, 'dest.basic.css');
        var srcText = fs.readFileSync(srcPath, {encoding: 'utf8'});
        var outputText = postcss().use(px2rem({remUnit: 75})).process(srcText).css;
        assert.equal(cssmin(outputText), cssmin(fs.readFileSync(outputPath, {encoding: 'utf8'})));
    });

    it('should get along well with other plugins', function() {
        var srcPath = path.join(__dirname, 'source.css');
        var outputPath = path.join(__dirname, 'dest.multiple.css');
        var srcText = fs.readFileSync(srcPath, {encoding: 'utf8'});
        var outputText = postcss()
            .use(autoprefixer({browsers: ['iOS >= 6', 'Android >= 2.3']}))
            .use(px2rem({remUnit: 75}))
            .use(opacity)
            .process(srcText).css;
        assert.equal(cssmin(outputText), cssmin(fs.readFileSync(outputPath, {encoding: 'utf8'})));
    });
});
