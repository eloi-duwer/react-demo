import { useEffect } from 'react'

// Reproduces behavior from https://codingame.typeform.com/to/ALqOmyNq

export interface useOverscrollOptions {
  callbackTopOverscroll?: () => void // Callback called when the user overscrolls to the top
  callbackBottomOverscroll?: () => void // Callback called when the user overscrolls to the bottom
  overscrollStrength?: number // number of px needed to be overscrolled to trigger overscroll callbacks
  timeoutMs?: number // If the user stop scrolling for this long, the amount overscrolled reset
  overscrollRecoverMs?: number // Minimum time between two firings of overscrolls callbacks
}

export default function useOverscroll ({
  callbackTopOverscroll,
  callbackBottomOverscroll,
  overscrollStrength = 600,
  timeoutMs = 1000,
  overscrollRecoverMs = 500
}: useOverscrollOptions) {
  useEffect(() => {
    let prevWindowY = window.scrollY
    let idTimeout: ReturnType<typeof setTimeout>
    let amountOverscroll = 0
    let disableOverscroll = false

    function disableOverscrollTemporarily () {
      disableOverscroll = true
      setTimeout(() => {
        disableOverscroll = false
      }, overscrollRecoverMs)
    }

    function handleWheelScroll (e: WheelEvent) {
      if (disableOverscroll) {
        return
      }
      const newWindowY = window.scrollY
      if (!e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey && prevWindowY === newWindowY) {
        clearTimeout(idTimeout)
        idTimeout = setTimeout(
          () => {
            amountOverscroll = 0
          }, timeoutMs
        )
        amountOverscroll += e.deltaY
        if (e.deltaY > 0) { // Bottom overscroll
          if (amountOverscroll >= overscrollStrength) {
            amountOverscroll = 0
            disableOverscrollTemporarily()
            callbackBottomOverscroll?.()
          }
        } else if (e.deltaY < 0) { // Top overscroll
          if (-amountOverscroll >= overscrollStrength) {
            amountOverscroll = 0
            disableOverscrollTemporarily()
            callbackTopOverscroll?.()
          }
        }
      } else {
        prevWindowY = newWindowY
        amountOverscroll = 0
        clearTimeout(idTimeout)
      }
    }

    window.addEventListener('wheel', handleWheelScroll)
    return () => {
      clearTimeout(idTimeout)
      window.removeEventListener('wheel', handleWheelScroll)
    }
  }, [callbackBottomOverscroll, callbackTopOverscroll, overscrollRecoverMs, overscrollStrength, timeoutMs])
}
