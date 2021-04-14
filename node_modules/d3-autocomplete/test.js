var createAutocomplete = require('.')

var autocomplete = createAutocomplete({}, function (query, cb) {
  setTimeout(function () {
    cb(null, [
      {label: 'Foo', gender: 'M'},
      {label: 'Bar', gender: 'F'}
    ].filter(n => n.label.toLowerCase().includes(query.toLowerCase())))
  }, 500)
})

autocomplete.on('change', d => console.log(d))
autocomplete.on('error', err => console.error(err))

document.body.appendChild(autocomplete.element)
