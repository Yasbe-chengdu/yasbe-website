import assert from 'node:assert/strict'

import { registerViewportPlaybackReplay, registerWeixinBridgeReplay } from './wechatVideoPlayback.js'

const createFakeDocument = () => {
  const listeners = new Map()

  return {
    addEventListener(type, listener, options) {
      listeners.set(type, { listener, options })
    },
    removeEventListener(type, listener) {
      if (listeners.get(type)?.listener === listener) {
        listeners.delete(type)
      }
    },
    listenerFor(type) {
      return listeners.get(type)?.listener
    },
    optionsFor(type) {
      return listeners.get(type)?.options
    },
    dispatch(type) {
      listeners.get(type)?.listener()
    },
  }
}

{
  const fakeDocument = createFakeDocument()
  const fakeWindow = {
    WeixinJSBridge: {},
    setTimeout(callback) {
      callback()
      return 1
    },
  }
  let replayCount = 0

  const stop = registerWeixinBridgeReplay(() => {
    replayCount += 1
  }, fakeDocument, fakeWindow)

  assert.equal(replayCount, 1)
  assert.equal(typeof fakeDocument.listenerFor('WeixinJSBridgeReady'), 'function')

  stop()

  assert.equal(fakeDocument.listenerFor('WeixinJSBridgeReady'), undefined)
}

{
  const fakeDocument = createFakeDocument()
  const fakeWindow = {
    setTimeout() {
      throw new Error('setTimeout should not be used without WeixinJSBridge')
    },
  }
  let replayCount = 0

  registerWeixinBridgeReplay(() => {
    replayCount += 1
  }, fakeDocument, fakeWindow)

  assert.equal(replayCount, 0)
  fakeDocument.listenerFor('WeixinJSBridgeReady')()
  assert.equal(replayCount, 1)
}

{
  const fakeDocument = createFakeDocument()
  const fakeWindow = createFakeDocument()
  let isNearViewport = false
  let replayCount = 0

  const stop = registerViewportPlaybackReplay({
    replay: () => {
      replayCount += 1
    },
    canReplay: () => isNearViewport,
    ownerDocument: fakeDocument,
    ownerWindow: fakeWindow,
  })

  fakeDocument.dispatch('touchstart')
  assert.equal(replayCount, 0)
  assert.equal(fakeDocument.optionsFor('touchstart')?.once, undefined)

  isNearViewport = true
  fakeDocument.dispatch('touchstart')
  assert.equal(replayCount, 1)

  fakeWindow.dispatch('pageshow')
  assert.equal(replayCount, 2)

  stop()
  fakeDocument.dispatch('touchstart')
  fakeWindow.dispatch('pageshow')
  assert.equal(replayCount, 2)
}
