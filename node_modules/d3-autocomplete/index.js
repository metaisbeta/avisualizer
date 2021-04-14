var d3 = require('d3')
var hook = require('d3-utils/lifecycle')
var ƒ = require('d3-utils/get')

var objectEqual = require('object-equal')
var origRaf = require('raf')
var raf = require('auto-abort')(origRaf, function (f) { return origRaf.cancel(f) })

var KEY_CODES = {
  UP: 38,
  DOWN: 40,
  ENTER: 13,
  ESC: 27
}

function indexOf (arr, obj) {
  for (var i = 0; i < arr.length; i++) {
    if (objectEqual(obj, arr[i])) return i
  }

  return -1
}

module.exports = function (attrs, queryCallback) {
  var emitter = d3.dispatch('change', 'error')

  var selectedIndex = 0
  var suggestionsData = []
  var hideSuggestionsTimer
  var isOpen

  var element = document.createElement('section')
  var $elm = d3.select(element)
  var input = document.createElement('input')
  var $input = d3.select(input)
  var suggestions = document.createElement('ol')
  var $suggestions = d3.select(suggestions)

  element.appendChild(input)
  element.appendChild(suggestions)

  $elm.classed({
    'autocomplete': true,
    'control': true
  })

  $input
      .classed('input', true)
      .attr({
        type: 'search',
        name: 'autocomplete',
        autocomplete: 'off',
        placeholder: attrs.placeholder || 'Search...'
      })
      .on('focus.autocomplete', completeQuery)
      .on('blur.autocomplete', onBlur)
      .on('input.autocomplete', completeQuery)
      .on('keydown.autocomplete', keyboardRouter)
      .on('keyup.autocomplete', function () { d3.event.stopPropagation() })
      .on('keypress.autocomplete', function () { d3.event.stopPropagation() })

  $suggestions
      .classed('suggestions', true)
  close()

  return {
    element: element,
    on: on,

    add: add,
    delete: del,
    clear: clear,

    close: close,
    open: open,
    toggle: toggle,

    query: query
  }

  function completeQuery () {
    if (hideSuggestionsTimer) clearTimeout(hideSuggestionsTimer)
    $elm.classed('is-loading', true)

    queryCallback($input.property('value'), function (err, results) {
      $elm.classed('is-loading', false)
      if (err) return emitter.error(err)

      open()
      selectedIndex = 0

      suggestionsData = results

      raf(render)
    })
  }

  function render () {
    $suggestions.selectAll('li')
      .data(suggestionsData, JSON.stringify)
    .call(hook(
      function (enter) {
        enter.append('li')
            .on('click.autocomplete', change)
            .on('mouseover.autocomplete', function (_, i) {
              selectedIndex = i
              raf(render)
            })
            .text(ƒ('label'))
      },
      function (update) {
        update
            .order()
            .classed('search-highlight', function (d, i) {
              return i === selectedIndex
            })
      },
      function (exit) {
        exit.remove()
      }
    ))
  }

  function onBlur () {
    if (hideSuggestionsTimer) return

    hideSuggestionsTimer = setTimeout(function () {
      close()
      if (input.value.length === 0) change({label: null})
      hideSuggestionsTimer = null
    }, 100)
  }

  function keyboardRouter () {
    d3.event.stopPropagation()
    var keyCode = d3.event.keyCode
    if (keyCode === KEY_CODES.ENTER) {
      if (isOpen) {
        change(suggestionsData[selectedIndex])
        d3.event.preventDefault()
        close()
      }

      return
    }

    if (keyCode === KEY_CODES.ESC) {
      selectedIndex = 0
      close()
      return
    }

    if (keyCode === KEY_CODES.UP) {
      d3.event.preventDefault()
      selectedIndex = mod(selectedIndex - 1, suggestionsData.length)
      open()
      raf(render)
      return
    }

    if (keyCode === KEY_CODES.DOWN) {
      d3.event.preventDefault()
      selectedIndex = mod(selectedIndex + 1, suggestionsData.length)
      open()
      raf(render)
      return
    }
  }

  function on () {
    return emitter.on.apply(emitter, arguments)
  }

  function add (obj, before) {
    if (Array.isArray(obj)) suggestionsData.splice.apply(suggestionsData, [indexOf(suggestionsData, before), 0].concat(obj))
    else suggestionsData.splice(indexOf(suggestionsData, before), 0, obj)
    raf(render)
  }

  function del (obj) {
    var idx = indexOf(suggestionsData, obj)

    if (idx > -1) {
      suggestionsData.splice(idx, 1)
      raf(render)
    }
  }

  function clear () {
    suggestionsData = []
    raf(render)
  }

  function close () {
    if (isOpen === false) return
    isOpen = false
    $suggestions.style('display', 'none')
  }

  function open () {
    if (isOpen === true) return
    isOpen = true
    $suggestions.style('display', null)
  }

  function toggle () {
    if (isOpen === true) return close()

    return open()
  }

  function change (d) {
    $input.property('value', d.label)
    emitter.change(d)
  }

  function query (val) {
    if (val == null) return input.value

    $input.property('value', val)
  }
}

function mod (n, p) {
  return ((n % p) + p) % p
}
