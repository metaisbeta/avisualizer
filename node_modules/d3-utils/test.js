const utils = require('.')
const test = require('tape')


test('lifecycle', function (assert) {
  var mock = _ => {}
  mock.enter = _ => {
    return {call: fn => fn(1)}
  }
  mock.exit = _ => {
    return {call: fn => fn(3)}
  }

  mock.call = function (fn) { return fn(2) }

  utils.lifecycle(
    enter => assert.strictEqual(enter, 1),
    update => assert.strictEqual(update, 2),
    exit => assert.strictEqual(exit, 3)
  )(mock)

  utils.lifecycle(
    enter => assert.strictEqual(enter, 1),
    null,
    exit => assert.strictEqual(exit, 3)
  )(mock)

  utils.lifecycle()(mock)

  assert.end()
})

test('get', function (assert) {
  var obj = {label: 'hello world', x: 100}

  assert.strictEqual(utils.get('label')(obj), 'hello world')
  assert.strictEqual(utils.get('data', 1337)(obj), 1337)
  assert.strictEqual(utils.get('data', null)(obj), null)
  assert.strictEqual(utils.get('x', 10)(obj), 100)

  assert.end()
})

test('compose', function (assert) {
  function mul (x) { return x * 3 }
  function sub (x) { return x - 5 }

  assert.strictEqual(utils.compose(mul, sub)(10), 25)
  assert.strictEqual(utils.compose(sub, mul)(10), 15)
  assert.end()
})
