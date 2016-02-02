import assert from 'assert'
import selector from '../src'
import h from 'snabbdom/h'
import thunk from 'snabbdom/thunk'

describe('snabbdom-selector', () => {
  it('should return a vnode by className from selector', done => {
    const vnode = h('div.test', {}, 'test')
    const result = selector('.test', vnode)
    assert.strictEqual(result[0].sel, 'div.test')
    assert.strictEqual(result[0].text, 'test')
    done()
  })

  it('should return a vNode by className from props', done => {
    const vNode = h('div', {props: {className: 'test'}}, 'test')
    const result = selector('.test', vNode)
    assert.strictEqual(result[0].sel, 'div')
    assert.strictEqual(result[0].data.props.className, 'test')
    assert.strictEqual(result[0].text, 'test')
    done()
  })

  it('should return a vNode by classnNme from class module', done => {
    const vNode = h('div', {class: {test: true}}, 'test')
    const result = selector('.test', vNode)
    assert.strictEqual(result[0].sel, 'div')
    assert.strictEqual(result[0].data.class.test, true)
    assert.strictEqual(result[0].text, 'test')
    done()
  })

  it('should return a vNode by className from all 3', done => {
    const vNode = h('div.test', {
      props: {className: 'anotherTest'},
      class: {theRealTest: true },
    }, 'test')
    const result = selector('.test.anotherTest.theRealTest', vNode)
    assert.strictEqual(result[0].sel, `div.test`)
    assert.strictEqual(result[0].text, 'test')
    done()
  })

  it('should return a vnode by ID from selector', done => {
    const vnode = h('div#test', {}, 'test')
    const result = selector('#test', vnode)
    assert.strictEqual(result[0].sel, 'div#test')
    assert.strictEqual(result[0].text, 'test')
    done()
  })

  it('should return a vnode by tagName', done => {
    const vnode = h('p.test', {}, 'test')
    const result = selector('p', vnode)
    assert.strictEqual(result[0].sel, 'p.test')
    assert.strictEqual(result[0].text, 'test')
    done()
  })

  it('should return nested vnodes by className', done => {
    const vnode = h('div#test', {}, [
      h('p.correct', {}, 'Hello')
    ])
    const result = selector('.correct', vnode)
    assert.strictEqual(result[0].sel, 'p.correct')
    assert.strictEqual(result[0].text, 'Hello')
    done()
  })

  it('should return nested vnodes by ID', done => {
    const vnode = h('div#test', {}, [
      h('p#correct', {}, 'Hello')
    ])
    const result = selector('#correct', vnode)
    assert.strictEqual(result[0].sel, 'p#correct')
    assert.strictEqual(result[0].text, 'Hello')
    done()
  })

  it('should return an array of vnodes than match selector', done => {
    const vnode = h('div#test', {}, [
      h('p.first', {}, 'first'),
      h('p.second', {}, 'second'),
      h('p.third', {}, 'third')
    ])
    const result = selector('p', vnode)
    assert.strictEqual(Array.isArray(result), true)
    assert.strictEqual(result.length, 3)
    assert.strictEqual(result[0].sel, 'p.first')
    assert.strictEqual(result[1].sel, 'p.second')
    assert.strictEqual(result[2].sel, 'p.third')
    done()
  })

  it('should match using `>` ', done => {
    const vnode = h('div#test', {}, [
      h('p.foo', {}, 'foo')
    ])
    const result = selector('#test > .foo', vnode)
    assert.strictEqual(result[0].sel, 'p.foo')
    done()
  })

  it('should match using `+`', done => {
    const vnode = h('div#test', {}, [
      h('div', {}, []),
      h('p.foo', {}, 'foo')
    ])
    const result = selector('div + .foo', vnode)
    assert.strictEqual(result[0].sel, 'p.foo')
    done()
  })

  it('should match using `~`', done => {
    const vnode = h('div#test', {}, [
      h('ul', {}, []),
      h('p.foo', {}, 'foo')
    ])
    const result = selector('ul ~ .foo', vnode)
    assert.strictEqual(result[0].sel, 'p.foo')
    done()
  })

  it('should match attributes' , done => {
    const vnode = h('div#test' , {attrs: {test: '1'}} , [
      h('p.foo', {}, 'foo')
    ])
    const result = selector('div[test=1]', vnode)
    assert.strictEqual(result[0].sel, 'div#test')
    done()
  })

  it('should fallback to matching attributes on props', done => {
    const vnode = h('div#test', {props: {test: 1}}, [
      h('p.foo', {}, 'foo')
    ])
    const result = selector('div[test=1]', vnode)
    assert.strictEqual(result[0].sel, 'div#test')
    done()
  })

  it('should be able to match thunks', done => {
    const exampleThunk = number => h('h2.thunk', {}, `${number}`)
    const vnode = h('div#test', [
      thunk('thunk', exampleThunk, 7)
    ])
    const result = selector('.thunk', vnode)
    assert.strictEqual(result[0].sel, 'h2.thunk')
    done()
  })

  describe('psuedo-selectors', done => {

    it('should match using :first-child', done => {
      const vnode = h('div#test', {}, [
        h('p.foo', {}, 'foo'),
        h('p.bar', {}, 'bar'),
        h('p.baz', {}, 'baz')
      ])
      const result = selector('p:first-child', vnode)
      assert.strictEqual(result[0].sel, 'p.foo')
      done()
    })

    it('should match using :last-child', done => {
      const vnode = h('div#test', {}, [
        h('p.foo', {}, 'foo'),
        h('p.bar', {}, 'bar'),
        h('p.baz', {}, 'baz')
      ])
      const result = selector('p:last-child', vnode)
      assert.strictEqual(result[0].sel, 'p.baz')
      done()
    })

    it('should match using :contains(text)', done => {
      const vnode = h('div#test', {}, [
        h('p.foo', {}, 'foo'),
        h('p.bar', {}, 'bar'),
        h('p.baz', {}, 'baz')
      ])
      const result = selector('p:contains("foo")', vnode)
      assert.strictEqual(result[0].sel, 'p.foo')
      done()
    })
  })
})
