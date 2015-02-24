/*!
 * deep-rename-keys <https://github.com/jonschlinkert/deep-rename-keys>
 *
 * Copyright (c) 2015 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var typeOf = require('kind-of');
var rename = require('rename-keys');

/**
 * Expose `renameDeep`
 */

module.exports = renameDeep;


function renameDeep(obj, cb) {
  if (typeof obj === 'undefined') {
    throw new Error('deep-rename-keys expects an object');
  }

  var res;
  if(typeOf(obj) === 'array')
    res = [];
  else
  {
    obj = rename(obj, cb);
    res = {};
  }

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      var val = obj[key];
      if (typeOf(val) === 'object' || typeOf(val) === 'array') {
        res[key] = renameDeep(val, cb);
      } else {
        res[key] = val;
      }
    }
  }
  return res;
}
