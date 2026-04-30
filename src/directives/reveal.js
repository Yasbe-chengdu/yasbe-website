const observerStore = new WeakMap()
const observerGroups = new Map()

function getRevealOffset(origin, distance) {
  const amount = `${distance}px`

  switch (origin) {
    case 'left':
      return { x: `-${amount}`, y: '0px' }
    case 'right':
      return { x: amount, y: '0px' }
    case 'top':
      return { x: '0px', y: `-${amount}` }
    default:
      return { x: '0px', y: amount }
  }
}

function getConfig(binding) {
  const value = typeof binding.value === 'object' && binding.value !== null ? binding.value : {}
  return {
    delay: value.delay ?? 0,
    duration: value.duration ?? 720,
    distance: value.distance ?? 32,
    origin: value.origin ?? 'bottom',
    threshold: value.threshold ?? 0.16,
    rootMargin: value.rootMargin ?? '0px 0px -10% 0px',
    once: value.once ?? true,
    scale: value.scale ?? 1,
  }
}

function getObserverKey(config) {
  return `${config.threshold}|${config.rootMargin}`
}

function getConfigSignature(config) {
  return [
    config.delay,
    config.duration,
    config.distance,
    config.origin,
    config.threshold,
    config.rootMargin,
    config.once,
    config.scale,
  ].join('|')
}

function applyRevealStyles(el, binding) {
  const config = getConfig(binding)
  const offset = getRevealOffset(config.origin, config.distance)

  el.classList.add('reveal')
  el.style.setProperty('--reveal-delay', `${config.delay}ms`)
  el.style.setProperty('--reveal-duration', `${config.duration}ms`)
  el.style.setProperty('--reveal-x', offset.x)
  el.style.setProperty('--reveal-y', offset.y)
  el.style.setProperty('--reveal-scale', `${config.scale}`)

  return config
}

function revealElement(el) {
  el.classList.add('is-visible')
}

function reduceMotionPreferred() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function cleanupObserver(el) {
  const record = observerStore.get(el)

  if (!record) {
    return
  }

  record.frameIds?.forEach((frameId) => cancelAnimationFrame(frameId))

  if (record.observerKey) {
    const group = observerGroups.get(record.observerKey)

    if (group) {
      group.observer.unobserve(el)
      group.elements.delete(el)

      if (group.elements.size === 0) {
        group.observer.disconnect()
        observerGroups.delete(record.observerKey)
      }
    }
  }

  observerStore.delete(el)
}

function getObserverGroup(config) {
  const observerKey = getObserverKey(config)
  const existingGroup = observerGroups.get(observerKey)

  if (existingGroup) {
    return { observerKey, group: existingGroup }
  }

  const group = {
    elements: new Map(),
    observer: new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          const elementConfig = group.elements.get(entry.target)

          if (!elementConfig) {
            return
          }

          revealElement(entry.target)

          if (elementConfig.once) {
            cleanupObserver(entry.target)
          }
        })
      },
      {
        threshold: config.threshold,
        rootMargin: config.rootMargin,
      },
    ),
  }

  observerGroups.set(observerKey, group)

  return { observerKey, group }
}

function mountObserver(el, binding, config = getConfig(binding)) {
  applyRevealStyles(el, binding)

  if (
    typeof window === 'undefined' ||
    reduceMotionPreferred() ||
    typeof IntersectionObserver === 'undefined'
  ) {
    revealElement(el)
    return
  }

  const configSignature = getConfigSignature(config)
  const frameIds = []
  const firstFrameId = requestAnimationFrame(() => {
    const secondFrameId = requestAnimationFrame(() => {
      const record = observerStore.get(el)

      if (!record || record.frameIds !== frameIds) {
        return
      }

      const { observerKey, group } = getObserverGroup(config)
      group.elements.set(el, config)
      group.observer.observe(el)
      observerStore.set(el, { configSignature, observerKey })
    })

    frameIds.push(secondFrameId)
  })

  frameIds.push(firstFrameId)
  observerStore.set(el, { configSignature, frameIds })
}

export const revealDirective = {
  mounted(el, binding) {
    mountObserver(el, binding)
  },
  updated(el, binding) {
    const config = getConfig(binding)
    const configSignature = getConfigSignature(config)
    const record = observerStore.get(el)

    if (record?.configSignature === configSignature) {
      return
    }

    cleanupObserver(el)

    mountObserver(el, binding, config)
  },
  unmounted(el) {
    cleanupObserver(el)
  },
}
