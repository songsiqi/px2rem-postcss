'use strict';

var postcss = require('postcss');
var Px2rem = require('px2rem');

module.exports = postcss.plugin('postcss-px2rem', function (options) {
  options.noComment = options.noComment || 'no'
  function isDisabledComment(node) {
    return node && node.type === 'comment' && node.text === options.noComment
  }
  
  return function (css, result) {
    var px2remIns = new Px2rem(options);
    var disabled = false;
    if (isDisabledComment(css.first)) {
      return css;
    }
    // the css below /* disabled */  are not transformed
    css.walkDecls(function (decl) {
      if (isDisabledComment(decl.parent.prev())) {
        disabled = true
      }
      if (disabled) {
        decl.parent.insertAfter(decl, '/* no */')
      }
    })
    var oldCssText = css.toString();
    var newCssText = px2remIns.generateRem(oldCssText);
    var newCssObj = postcss.parse(newCssText);
    result.root = newCssObj;
  };
});