# `d3-utils`

> Small utils to make developing with d3 easier, inspired by d3-jetpack and d3-starterkit

## Install

```sh
npm install d3-utils
```

## Usage

```js
var d3 = require('d3')

var lifecycle = require('d3-utils/lifecycle')
var ƒ = require('d3-utils/get')
var o = require('d3-utils/compose')

var scale = {x: d3.scale.linear().range([0, 1000])}

d3.selectAll('li')
    .data(someDataArray) // [{label: 'Hello world', x: 0.5}, ...]
  .call(lifecycle(
    enter => enter.append('li').text(ƒ('label')),
    update => update.style('top', o(ƒ('x'), scale.x)),
    exit => exit.remove()
  ))

```

## API

### `utils.lifecycle([enter], [update], [exit])`

Makes handeling the lifecycle of a D3 selection a bit easier.

#### `enter`
Type: `Function`<br>
Default `noop`

Calls this function with `selection.enter()`

#### `update`
Type: `Function`<br>
Default `noop`

Calls this function with `selection`

#### `exit`
Type: `Function`<br>
Default `noop`

Calls this function with `selection.exit()`

### `utils.get(prop, [default])`

Returns a function that accesses `prop` and returns it, optionally returning
`default` if `null`

#### `prop`
Type: `String`

Retrieve value with key `prop` from whatever object is called on the returining
function

#### `default`
Type: `Any`<br>
Default `null`

Default value to return

### `utils.compose([fn...])`

Takes any number of functions and composes them from left to right, returning
the compose function, eg:

```js
f(g(h(x))) === utils.compose(h, g, f)(x)
```

## License

[ISC](LICENSE.md)
