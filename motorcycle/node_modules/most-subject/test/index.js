/* eslint max-nested-callbacks: 0 */
/* global describe, it */
import assert from 'assert'
import {Stream} from 'most'
import {subject, holdSubject} from '../src'

describe('subject()', () => {
  it('should return Object with stream and observer', () => {
    const s = subject()
    assert.strictEqual(typeof s, 'object')
    assert.strictEqual(typeof s.stream, 'object')
    assert.strictEqual(typeof s.observer, 'object')
  })

  describe('stream', () => {
    it('should be an extension of Stream', () => {
      const {stream} = subject()
      assert.strictEqual(stream instanceof Stream, true)
    })

    it('should inherit Stream combinators', done => {
      const {observer, stream} = subject()

      stream
        .map(x => x * x)
        .forEach(x => {
          assert.strictEqual(x, 25)
        }).then(done)

      observer.next(5)
      observer.complete()
    })
  })

  describe('observer', () => {
    it('should have next for sending new values', () => {
      const {observer} = subject()
      assert.strictEqual(typeof observer.next, 'function')
    })

    it('should allow nexting events', done => {
      const {observer, stream} = subject()

      assert.strictEqual(typeof observer.next, 'function')

      stream.forEach(x => {
        assert.strictEqual(x, 1)
      }).then(done)

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

    it('should have complete for ending stream', () => {
      const {observer} = subject()
      assert.strictEqual(typeof observer.complete, 'function')
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

      stream
        .forEach(assert.fail)
        .then(done)
        .catch(assert.fail)

      observer.complete()
      observer.next(1)
    })
  })
})

describe('holdSubject', () => {
  it('should throw if given a bufferSize less than 0', () => {
    assert.throws(() => {
      holdSubject(-1)
    })
  })

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
        done()
      })

    observer.complete()
  })
})
