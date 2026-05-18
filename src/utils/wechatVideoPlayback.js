export const registerWeixinBridgeReplay = (
    replay,
    ownerDocument = globalThis.document,
    ownerWindow = globalThis.window,
) => {
    if (!ownerDocument?.addEventListener || !ownerDocument?.removeEventListener) {
        return () => {}
    }

    const replayDirectly = () => {
        replay()
    }

    const replayThroughBridge = () => {
        const bridge = ownerWindow?.WeixinJSBridge

        if (typeof bridge?.invoke === 'function') {
            bridge.invoke('getNetworkType', {}, replayDirectly)
            return
        }

        replayDirectly()
    }

    ownerDocument.addEventListener('WeixinJSBridgeReady', replayThroughBridge, false)

    if (ownerWindow?.WeixinJSBridge) {
        ownerWindow.setTimeout(replayThroughBridge, 0)
    }

    return () => {
        ownerDocument.removeEventListener('WeixinJSBridgeReady', replayThroughBridge, false)
    }
}

export const registerViewportPlaybackReplay = ({
    replay,
    canReplay,
    ownerDocument = globalThis.document,
    ownerWindow = globalThis.window,
}) => {
    if (!ownerDocument?.addEventListener || !ownerWindow?.addEventListener) {
        return () => {}
    }

    const replayWhenReady = () => {
        if (canReplay()) {
            replay()
        }
    }

    ownerDocument.addEventListener('touchstart', replayWhenReady, { passive: true })
    ownerWindow.addEventListener('pageshow', replayWhenReady)

    return () => {
        ownerDocument.removeEventListener('touchstart', replayWhenReady)
        ownerWindow.removeEventListener('pageshow', replayWhenReady)
    }
}
