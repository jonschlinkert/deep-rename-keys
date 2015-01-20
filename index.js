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

  obj = rename(obj, cb);
  var res = {};

  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      var val = obj[key];
      if (typeOf(val) === 'object') {
        res[key] = renameDeep(val);
      } else {
        res[key] = val;
      }
    }
  }
  return res;
}
