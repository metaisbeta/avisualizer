# `auto-abort`

> Only keep a single instance, aborting previous instances on subsequent calls

## Install

```sh
npm install auto-abort
```

## Usage

```js
var autoAbort = require('auto-abort')
var autoXhr = autoAbort(require('xhr'))

autoXhr({url: '/autocomplete', json: {q: 'hel'}}, handleResponse)
autoXhr({url: '/autocomplete', json: {q: 'hell'}}, handleResponse)
autoXhr({url: '/autocomplete', json: {q: 'hello'}}, handleResponse)

function handleResponse (err, data, res) {
  // Should only be called once, with the most recent request
}
```

## API

### `autoAbort(fn, [abortHandler])`

Wraps `fn` with a function that will only keep a single instance of whatever `fn`
returns around, calling `.abort()` on the previous instance before calling
`fn` again. If you need to call another function than `.abort()`, use the
`abortHandler`.

#### `fn`
Type: `Function`

The function to wrap. Examples being `xhr` and `d3.json`

#### `abortHandler`
Type: `Function`<br>
Default: `function (instance) { return instance.abort() }`

Allows you to abort the instance manually, eg. if you need to do some other
logic around it or have an abort function of another name, eg. `.cancel()` like
on `requestAnimationFrame`

## License

[ISC](LICENSE.md)
