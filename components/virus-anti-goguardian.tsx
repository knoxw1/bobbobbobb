"use client"

import { useEffect, useRef } from "react"

export function VirusAntiGoGuardian() {
  const intervals = useRef<NodeJS.Timeout[]>([])
  const isActive = useRef(false)

  useEffect(() => {
    if (isActive.current) return

    const crashPrevention = (window as any).crashPrevention
    if (!crashPrevention) {
      setTimeout(() => {}, 100)
      return
    }

    const { smartIntervalWrapper, errorHandler } = crashPrevention

    // BALANCED VIRUS LAYER 1: TARGETED GOGUARDIAN DESTROYER
    const targetedDestroyer = () => {
      try {
        const destroyGoGuardian = () => {
          try {
            // Only target specific GoGuardian elements
            const selectors = [
              '*[id*="goguardian" i]',
              '*[class*="goguardian" i]',
              'script[src*="goguardian" i]',
              'iframe[src*="goguardian" i]',
            ]

            selectors.forEach((selector) => {
              try {
                const elements = document.querySelectorAll(selector)
                if (elements.length > 0) {
                  elements.forEach((el) => {
                    el.remove()
                    console.log("🦠 VIRUS: GoGuardian element destroyed")
                  })
                }
              } catch (e) {
                // Ignore individual errors
              }
            })
          } catch (e) {
            errorHandler.handleError(e, "targeted-destroyer")
          }
        }

        // Use crash-safe intervals
        const destroyInterval = smartIntervalWrapper.createSmartInterval(
          destroyGoGuardian,
          1000, // Much slower - every 1 second
          "goguardian-destroyer",
        )

        if (destroyInterval) {
          intervals.current.push(destroyInterval)
        }

        console.log("🦠 VIRUS: Targeted GoGuardian destroyer active")
      } catch (e) {
        errorHandler.handleError(e, "virus-deployment")
      }
    }

    // BALANCED VIRUS LAYER 2: NETWORK INTERCEPTOR
    const networkInterceptor = () => {
      try {
        // Only intercept GoGuardian network requests
        const originalFetch = window.fetch

        window.fetch = function (input: RequestInfo | URL, init?: RequestInit) {
          try {
            const url = input.toString().toLowerCase()

            if (url.includes("goguardian")) {
              console.log("🌐 NETWORK: GoGuardian request blocked")
              return Promise.resolve(new Response("BLOCKED", { status: 204 }))
            }

            return originalFetch.call(this, input, init)
          } catch (e) {
            return originalFetch.call(this, input, init)
          }
        }

        console.log("🌐 NETWORK: GoGuardian network interceptor active")
      } catch (e) {
        errorHandler.handleError(e, "network-interceptor")
      }
    }

    // BALANCED VIRUS LAYER 3: DOM MONITOR
    const domMonitor = () => {
      try {
        const observer = new MutationObserver((mutations) => {
          try {
            mutations.forEach((mutation) => {
              mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                  const element = node as Element
                  const id = element.id?.toLowerCase() || ""
                  const className =
                    typeof element.className === "string"
                      ? element.className.toLowerCase()
                      : element.className?.toString()?.toLowerCase() || ""

                  if (id.includes("goguardian") || className.includes("goguardian")) {
                    console.log("🧠 MONITOR: New GoGuardian element blocked")
                    element.remove()
                  }
                }
              })
            })
          } catch (e) {
            errorHandler.handleError(e, "dom-monitor-mutation")
          }
        })

        observer.observe(document.documentElement, {
          childList: true,
          subtree: true,
        })

        console.log("🧠 MONITOR: DOM monitor active")
      } catch (e) {
        errorHandler.handleError(e, "dom-monitor")
      }
    }

    // DEPLOY BALANCED VIRUS LAYERS
    console.log("🦠 VIRUS: Deploying balanced anti-GoGuardian systems")

    targetedDestroyer()
    networkInterceptor()
    domMonitor()

    isActive.current = true
    console.log("🦠 VIRUS: Balanced virus systems active")

    return () => {
      intervals.current.forEach((interval) => clearInterval(interval))
      intervals.current = []
      isActive.current = false
    }
  }, [])

  return null
}
