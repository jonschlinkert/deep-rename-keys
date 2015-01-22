/*!
 * deep-rename-keys <https://github.com/jonschlinkert/deep-rename-keys>
 *
 * Copyright (c) 2015 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var typeOf = require('kind-of');

/**
 * Expose `renameDeep`
 */

module.exports = renameDeep;


function renameDeep(obj, fn) {
  if (typeof obj === 'undefined') {
    throw new Error('deep-rename-keys expects an object');
  }

  var res = (typeOf(obj) === 'array') ? [] : {};

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      // Call function with key & ancestors
      var args = [].slice.call(arguments, 2);

      var prop = key;
      var val = obj[key];
      if (typeOf(obj) === 'array') {
        // use index as key
        prop = +key;
        args.unshift(prop);
      }
      else {
        args.unshift(key);
        prop = fn.apply(null, args) || key;
      }

      if (typeOf(val) === 'object' || typeOf(val) === 'array') {
        // copy of args
        var recurArgs = [].slice.call(args, 0);
        // prepent val and function into args
        recurArgs.unshift(fn);
        recurArgs.unshift(val);
        res[prop] = renameDeep.apply(null, recurArgs);
      } else {
        res[prop] = val;
      }
    }
  }
  return res;
}
