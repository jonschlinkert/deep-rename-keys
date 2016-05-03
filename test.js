/*!
 * deep-rename-keys <https://github.com/jonschlinkert/deep-rename-keys>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var assert = require('assert');
var rename = require('./');

it('should rename nested keys.', function () {
  var foo = rename({a: 'b', c: 'd', e: {c: 'f', g: {c: 'h'}}}, function(key) {
    if (key === 'c') {
      return 'zzz';
    }
    return key;
  });
  assert.deepEqual(foo, {a: 'b', zzz: 'd', e: {zzz: 'f', g: {zzz: 'h'}}});

  var bar = rename({a: {a: {a: 'b'}}}, function(key) {
    if (key === 'a') {
      return 'zzz';
    }
    return key;
  });
  assert.deepEqual(bar, {zzz: {zzz: {zzz: 'b'}}});
});

it('should rename keys of objects nested in arrays.', function () {
  var foo = rename([{a:'b',c:'d',e:[{c:'f',a:{c:'a'}},{c:'f',a:{c:'a'}},{c:'f',a:{c:'a'}}]},{a:'b',c:'d',e:[{c:'f',a:{c:'a'}},{c:'f',a:{c:'a'}},{c:'f',a:{c:'a'}}]}], function(key) {
    if (key === 'c') {
      return 'zzz';
    }
    return key;
  });
  assert.deepEqual(foo, [{a:'b',zzz:'d',e:[{zzz:'f',a:{zzz:'a'}},{zzz:'f',a:{zzz:'a'}},{zzz:'f',a:{zzz:'a'}}]},{a:'b',zzz:'d',e:[{zzz:'f',a:{zzz:'a'}},{zzz:'f',a:{zzz:'a'}},{zzz:'f',a:{zzz:'a'}}]}]);

  var bar = rename([{a:[{a:[{a: 'a'},{a: 'b'}]},{a:[{a: 'a'},{a: 'b'}]}]},{a:[{a:[{a: 'a'},{a: 'b'}]},{a:[{a: 'a'},{a: 'b'}]}]}], function(key) {
    if (key === 'a') {
      return 'zzz';
    }
    return key;
  });
  assert.deepEqual(bar, [{zzz:[{zzz:[{zzz: 'a'},{zzz: 'b'}]},{zzz:[{zzz: 'a'},{zzz: 'b'}]}]},{zzz:[{zzz:[{zzz: 'a'},{zzz: 'b'}]},{zzz:[{zzz: 'a'},{zzz: 'b'}]}]}]);
});
