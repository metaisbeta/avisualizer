# `d3-autocomplete`

> Small autocomplete written using D3

**PRs welcome!**

## Install

```sh
npm install d3-autocomplete
```

## Usage

```js
var createAutocomplete = require('d3-autocomplete')

var autocomplete = createAutocomplete({placeholder: 'Søg'}, function (query, cb) {
  cb(null, [
    {label: 'Foo', some: 'key'},
    {label: 'Bar', some: 'key'}
  ])
})

autocomplete.on('change', function (data) {
  console.log(data)
})

autocomplete.on('error', function (err) {
  console.error(err)
})

document.body.appendChild(autocomplete.element)

```

## API

### `createAutocomplete(attrs, queryCallback)`

Returns:

```js
{
  element, // The element to add to the DOM
  on(event, listener), // Listen for either `change` or `error` events

  add(suggestion), // Add a suggestion
  delete(suggestion), // Remove a suggestion
  clear(), // Remove all suggestions

  open(), // Open suggestions
  close(), // Close suggestions
  toggle(), // Toggle suggestions

  query([value]) // Set/get query of autocomplete
}
```

#### `attrs`
Type: `Object`

Various attributes to change on the elements created. See the source

#### `queryCallback(query, callback)`
Type: `Function`

Called when requesting completions for `query`. Pass back results through `callback(err, result)`

## License

[ISC](LICENSE.md)
