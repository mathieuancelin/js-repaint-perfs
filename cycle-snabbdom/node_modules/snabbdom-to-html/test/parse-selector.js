
var test = require('tape')
var parseSelector = require('../parse-selector')

test('Parse selector helper', function (t) {
  var result

  result = parseSelector()
  t.deepEqual(result, { tagName: 'div', id: '', className: '' })

  result = parseSelector('')
  t.deepEqual(result, { tagName: 'div', id: '', className: '' })

  result = parseSelector('p')
  t.deepEqual(result, { tagName: 'p', id: '', className: '' })

  result = parseSelector('p#foo')
  t.deepEqual(result, { tagName: 'p', id: 'foo', className: '' })

  result = parseSelector('p.bar')
  t.deepEqual(result, { tagName: 'p', id: '', className: 'bar' })

  result = parseSelector('p.bar.baz')
  t.deepEqual(result, { tagName: 'p', id: '', className: 'bar baz' })

  result = parseSelector('p#foo.bar.baz')
  t.deepEqual(result, { tagName: 'p', id: 'foo', className: 'bar baz' })

  result = parseSelector('#foo')
  t.deepEqual(result, { tagName: 'div', id: 'foo', className: '' })

  result = parseSelector('#foo.bar.baz')
  t.deepEqual(result, { tagName: 'div', id: 'foo', className: 'bar baz' })

  result = parseSelector('.bar.baz')
  t.deepEqual(result, { tagName: 'div', id: '', className: 'bar baz' })

  result = parseSelector('.upper', true)
  t.deepEqual(result, { tagName: 'DIV', id: '', className: 'upper' })

  t.end()
})
