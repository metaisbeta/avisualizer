var assert = require('assert')

module.exports = function (fn, abortHandler) {
  var instance
  if (abortHandler == null) abortHandler = function (inst) { return inst.abort() }
  assert.strictEqual(typeof abortHandler, 'function', 'abortHandler should be a function')

  return function () {
    if (instance) abortHandler(instance)

    instance = fn.apply(this, arguments)

    return instance
  }
}
