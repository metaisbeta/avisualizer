'use strict'

var xhr = require('xhr')
var test = require('tape')
var autoAbort = require('.')

test('made up test', function (assert) {
  assert.plan(1)

  var auto = autoAbort(mock)

  auto(function () {
    assert.pass()
  })
  auto(function () {
    assert.pass()
  })

  function mock (cb) {
    var hasAborted = false

    setTimeout(function () {
      if (!hasAborted) cb()
    }, 0)

    return {abort: function () { hasAborted = true }}
  }
})

test('abortHandler', function (assert) {
  assert.plan(1)

  var auto = autoAbort(mock, instance => instance.cancel())

  auto(function () {
    assert.pass()
  })
  auto(function () {
    assert.pass()
  })

  function mock (cb) {
    var hasAborted = false

    setTimeout(function () {
      if (!hasAborted) cb()
    }, 0)

    return {cancel: function () { hasAborted = true }}
  }
})

test('throws', function (assert) {
  assert.throws(_ => autoAbort(_ => {}, 'hello'))
  assert.end()
})

test('real-world test', function (assert) {
  assert.plan(1)

  var singleXhr = autoAbort(xhr)

  singleXhr({ url: window.location }, function () {
    assert.pass()
  })
  singleXhr({ url: window.location }, function () {
    assert.pass()
  })
})
