import { useRef, useEffect, useCallback } from 'react'

const FADE_MS = 500
const FADE_OUT_LEAD = 0.55

export default function FadingVideo({ src, className, style }) {
  const videoRef = useRef(null)
  const rafRef = useRef(null)
  const fadingOutRef = useRef(false)

  const fadeTo = useCallback((target, duration) => {
    const video = videoRef.current
    if (!video) return
    cancelAnimationFrame(rafRef.current)
    const start = performance.now()
    const startOpacity = parseFloat(video.style.opacity) || 0

    function step(now) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      video.style.opacity = startOpacity + (target - startOpacity) * progress
      if (progress < 1) rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.style.opacity = '0'

    function onLoadedData() {
      video.style.opacity = '0'
      video.play().catch(() => {})
      fadeTo(1, FADE_MS)
    }

    function onTimeUpdate() {
      if (!fadingOutRef.current) {
        const remaining = video.duration - video.currentTime
        if (remaining <= FADE_OUT_LEAD && remaining > 0) {
          fadingOutRef.current = true
          fadeTo(0, FADE_MS)
        }
      }
    }

    function onEnded() {
      video.style.opacity = '0'
      setTimeout(() => {
        video.currentTime = 0
        video.play().catch(() => {})
        fadingOutRef.current = false
        fadeTo(1, FADE_MS)
      }, 100)
    }

    video.addEventListener('loadeddata', onLoadedData)
    video.addEventListener('timeupdate', onTimeUpdate)
    video.addEventListener('ended', onEnded)

    return () => {
      cancelAnimationFrame(rafRef.current)
      video.removeEventListener('loadeddata', onLoadedData)
      video.removeEventListener('timeupdate', onTimeUpdate)
      video.removeEventListener('ended', onEnded)
    }
  }, [fadeTo])

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted
      playsInline
      preload="auto"
      className={className}
      style={{ opacity: 0, ...style }}
    />
  )
}
