function noop () {}

module.exports = function (enter, update, exit) {
  return function (selection) {
    selection.enter().call(enter || noop)
    selection.call(update || noop)
    selection.exit().call(exit || noop)
  }
}
