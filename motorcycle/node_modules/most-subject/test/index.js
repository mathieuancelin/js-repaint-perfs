import assert from 'assert'
import {Stream} from 'most'
import {subject, holdSubject} from '../src'

describe('subject()', () => {
  it('should return Object with stream and sink', done => {
    const s = subject()
    assert.strictEqual(typeof s, 'object')
    assert.strictEqual(typeof s.stream, 'object')
    assert.strictEqual(typeof s.sink, 'object')
    done()
  })

  it('should have alias `observer` for `sink`', done => {
    const s = subject()
    assert.strictEqual(typeof s.observer, 'object')
    assert.strictEqual(typeof s.observer, 'object')
    assert.strictEqual(s.observer, s.observer)
    done()
  })

  describe('stream', () => {
    it('should be an extension of Stream', done => {
      const {stream} = subject()
      assert.strictEqual(stream instanceof Stream, true)
      done()
    })

    it('should inherit Stream combinators', done => {
      const {observer, stream} = subject()

      stream
        .map(x => x * x)
        .forEach(x => {
          assert.strictEqual(x, 25)
          done()
        })

      observer.next(5)
      observer.complete()
    })
  })

  describe('observer', () => {
    it('should have add and next for sending new values', done => {
      const {observer} = subject()

      assert.strictEqual(typeof observer.add, 'function')
      assert.strictEqual(typeof observer.next, 'function')

      done()
    })

    it('should allow nexting events', done => {
      const {observer, stream} = subject()

      assert.strictEqual(typeof observer.next, 'function')

      stream.forEach(x => {
        assert.strictEqual(x, 1)
        done()
      })

      observer.next(1)
      observer.complete()
    })

    it('should allow sending errors' , done => {
      const {observer, stream} = subject()

      assert.strictEqual(typeof observer.error, 'function')
      stream
        .drain()
        .then(assert.fail)
        .catch(err => {
          assert.strictEqual(err.message, 'Error Message')
          done()
        })

      observer.next(1)
      observer.next(2)
      observer.error(new Error('Error Message'))
    })

    it('should have end and complete for ending stream', done => {
      const {observer} = subject()

      assert.strictEqual(typeof observer.end, 'function')
      assert.strictEqual(typeof observer.complete, 'function')

      done()
    })

    it('should allow ending of stream', done => {
      const {observer, stream} = subject()

      stream
        .forEach(assert.fail)
        .then(done)
        .catch(assert.fail)

      observer.complete()
    })

    it('should not allow events after end', done => {
      const {observer, stream} = subject()

      const now = () => setTimeout(done, 10)
      stream
        .forEach(assert.fail)
        .then(now)
        .catch(assert.fail)

      observer.complete()
      observer.next(1)
    })
  })

  it('should allow starting with an initialValue', done => {
    const {observer, stream} = subject(1)

    stream.observe(x => {
      assert.strictEqual(x, 1)
    })

    stream.observe(x => {
      assert.strictEqual(x, 1)
    })

    observer.complete()
    setTimeout(done, 10)
  })
})

describe('holdSubject', () => {
  it('should replay the last value', done => {
    const {observer, stream} = holdSubject()
    observer.next(1)
    observer.next(2)

    stream.forEach(x => {
      assert.strictEqual(x, 2)
    }).then(done)

    setTimeout(observer.complete, 10)
  })

  it('should allow for adjusting bufferSize of stream', done => {
    const {observer, stream} = holdSubject(3)

    observer.next(1)
    observer.next(2)
    observer.next(3)
    observer.next(4)

    stream
      .reduce((x, y) => x.concat(y), [])
      .then(x => {
        assert.deepEqual(x, [2, 3, 4])
        setTimeout(done, 25)
      })

    observer.complete()
  })

  it('should allow for adding an initialValue', done => {
    const {observer, stream} = holdSubject(4, 1)

    observer.next(2)
    observer.next(3)
    observer.next(4)

    stream.reduce((x, y) => x.concat(y), [])
      .then(x => {
        assert.deepEqual(x, [1, 2, 3, 4])
        setTimeout(done, 25)
      })

    observer.complete()
  })
})
