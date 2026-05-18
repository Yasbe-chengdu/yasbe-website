export const registerWeixinBridgeReplay = (
    replay,
    ownerDocument = globalThis.document,
    ownerWindow = globalThis.window,
) => {
    if (!ownerDocument?.addEventListener || !ownerDocument?.removeEventListener) {
        return () => {}
    }

    const runReplay = () => {
        replay()
    }

    ownerDocument.addEventListener('WeixinJSBridgeReady', runReplay, false)

    if (ownerWindow?.WeixinJSBridge) {
        ownerWindow.setTimeout(runReplay, 0)
    }

    return () => {
        ownerDocument.removeEventListener('WeixinJSBridgeReady', runReplay, false)
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
