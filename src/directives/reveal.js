const observerStore = new WeakMap()

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

function mountObserver(el, binding) {
  const config = applyRevealStyles(el, binding)

  if (
    typeof window === 'undefined' ||
    reduceMotionPreferred() ||
    typeof IntersectionObserver === 'undefined'
  ) {
    revealElement(el)
    return
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return
            }

            revealElement(el)

            if (config.once) {
              observer.unobserve(el)
              observer.disconnect()
              observerStore.delete(el)
            }
          })
        },
        {
          threshold: config.threshold,
          rootMargin: config.rootMargin,
        },
      )

      observer.observe(el)
      observerStore.set(el, observer)
    })
  })
}

export const revealDirective = {
  mounted(el, binding) {
    mountObserver(el, binding)
  },
  updated(el, binding) {
    if (binding.value === binding.oldValue) {
      return
    }

    const previousObserver = observerStore.get(el)
    previousObserver?.disconnect()
    observerStore.delete(el)

    mountObserver(el, binding)
  },
  unmounted(el) {
    const observer = observerStore.get(el)
    observer?.disconnect()
    observerStore.delete(el)
  },
}
