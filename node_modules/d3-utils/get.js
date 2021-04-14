module.exports = function (property, defaultValue) {
  return function (data) {
    var res = data[property]
    if (res == null) return defaultValue
    return res
  }
}
