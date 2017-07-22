'use strict';

var postcss = require('postcss');
var Px2rem = require('px2rem');

module.exports = postcss.plugin('postcss-px2rem', function (options) {
  return function (css, result) {
  	var exclude = options.exclude || '';
  	for (var i = 0; i < options.exclude.length; i++) {
  		if (exclude && (css.source.input.file.indexOf(exclude[i]) > -1)) {
  			return css;
  		};
  	};
  	
    var oldCssText = css.toString();
    var px2remIns = new Px2rem(options);
    var newCssText = px2remIns.generateRem(oldCssText);
    var newCssObj = postcss.parse(newCssText);
    result.root = newCssObj;
  };
});
