var assert = require('assert');
var path = require('path');
var fs = require('fs');
var px2rem = require('..');
var cssmin = require('cssmin');
var postcss = require('postcss');

describe('postcss-px2rem', function() {

    it('[default] should output right rem file', function() {
        var srcPath = path.join(__dirname, 'source.css');
        var outputPath = path.join(__dirname, 'dest.css');
        var srcText = fs.readFileSync(srcPath, {encoding: 'utf8'});
        var outputText = postcss().use(px2rem({remUnit: 64})).process(srcText).css;
        assert.equal(cssmin(outputText), cssmin(fs.readFileSync(outputPath, {encoding: 'utf8'})));
    });
});
