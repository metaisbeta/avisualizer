module.exports = function (/* functions */) {
  var fns = [].slice.call(arguments)

  return function (input) {
    return fns.reduce(function (result, fn) {
      return fn(result)
    }, input)
  }
}
