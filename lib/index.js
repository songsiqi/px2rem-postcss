'use strict';

var postcss = require('postcss');
var Px2rem = require('px2rem');
var extend = require('extend');

module.exports = postcss.plugin('postcss-px2rem', function(options) {
    return function(css, result) {
        var oldCssText = css.toString();
        var px2remIns = new Px2rem(options);
        var newCssText = px2remIns.generateRem(oldCssText);
        var newCssObj = postcss.parse(newCssText);
        extend(true, css, newCssObj);
    };
});
