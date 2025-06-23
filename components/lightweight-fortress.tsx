"use client"

import { useEffect, useRef } from "react"

export function LightweightFortress() {
  const intervals = useRef<NodeJS.Timeout[]>([])
  const observers = useRef<MutationObserver[]>([])
  const isActive = useRef(false)

  useEffect(() => {
    if (isActive.current) return

    // Wait for crash prevention system
    const initFortress = () => {
      const crashPrevention = (window as any).crashPrevention
      if (!crashPrevention) {
        setTimeout(initFortress, 100)
        return
      }

      const { intervalManager, observerManager, adaptiveThrottler } = crashPrevention

      // LIGHTWEIGHT LAYER 1: CORE GOGUARDIAN BLOCKER
      const coreGoguardianBlocker = () => {
        try {
          // Most essential blocking patterns
          const essentialSelectors = [
            '*[id*="goguardian" i]',
            '*[class*="goguardian" i]',
            '*[id*="gg-"]',
            '*[class*="gg-"]',
          ]

          essentialSelectors.forEach((selector) => {
            try {
              const elements = document.querySelectorAll(selector)
              elements.forEach((el) => {
                try {
                  el.remove()
                  console.log("🛡️ LIGHTWEIGHT: Core element blocked")
                } catch (e) {
                  // Ignore
                }
              })
            } catch (e) {
              // Ignore selector errors
            }
          })
        } catch (e) {
          console.warn("Core blocker error:", e)
        }
      }

      // LIGHTWEIGHT LAYER 2: ESSENTIAL DOM PROTECTION
      const essentialDomProtection = () => {
        const observer = observerManager.createObserver(
          (mutations) => {
            // Process only first few mutations to reduce load
            const limitedMutations = mutations.slice(0, 5)

            limitedMutations.forEach((mutation) => {
              // Process only first few added nodes
              const limitedNodes = Array.from(mutation.addedNodes).slice(0, 3)

              limitedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                  const element = node as Element
                  const id = element.id?.toLowerCase() || ""
                  const className = element.className?.toLowerCase() || ""

                  if (id.includes("goguardian") || className.includes("goguardian")) {
                    try {
                      element.remove()
                      console.log("🛡️ LIGHTWEIGHT: DOM protection triggered")
                    } catch (e) {
                      // Ignore
                    }
                  }
                }
              })
            })
          },
          {
            childList: true,
            subtree: false, // Only monitor direct children to reduce load
            attributes: false,
            characterData: false,
          },
          "essential-dom-protection",
        )

        if (observer) {
          observers.current.push(observer)
        }
      }

      // LIGHTWEIGHT LAYER 3: BASIC CHROME API BLOCKING
      const basicChromeApiBlocking = () => {
        try {
          if ((window as any).chrome && !(window as any).chrome._lightweightBlocked) {
            const originalChrome = (window as any).chrome
            ;(window as any).chrome = {
              get runtime() {
                console.log("🔒 LIGHTWEIGHT: Chrome runtime access blocked")
                return undefined
              },
              get extension() {
                console.log("🔒 LIGHTWEIGHT: Chrome extension access blocked")
                return undefined
              },
            }
            ;(window as any).chrome._lightweightBlocked = true
            console.log("🔒 LIGHTWEIGHT: Basic Chrome API blocking active")
          }
        } catch (e) {
          console.warn("Chrome API blocking error:", e)
        }
      }

      // LIGHTWEIGHT LAYER 4: SIMPLE NETWORK BLOCKING
      const simpleNetworkBlocking = () => {
        try {
          if (!window.fetch.toString().includes("lightweight-blocked")) {
            const originalFetch = window.fetch
            window.fetch = function (input: RequestInfo | URL, init?: RequestInit) {
              const url = input.toString().toLowerCase()

              // Block only most critical patterns
              if (url.includes("goguardian")) {
                console.log("🌐 LIGHTWEIGHT: Network request blocked")
                return Promise.reject(new Error("lightweight-blocked"))
              }

              return originalFetch.call(this, input, init)
            }
            console.log("🌐 LIGHTWEIGHT: Simple network blocking active")
          }
        } catch (e) {
          console.warn("Network blocking error:", e)
        }
      }

      // LIGHTWEIGHT LAYER 5: MINIMAL MEMORY CLEANUP
      const minimalMemoryCleanup = () => {
        try {
          // Only clean most obvious extension data
          const suspiciousKeys = ["goguardian", "gg-extension"]

          suspiciousKeys.forEach((key) => {
            try {
              if (localStorage.getItem(key)) {
                localStorage.removeItem(key)
                console.log("🧹 LIGHTWEIGHT: Cleaned suspicious storage")
              }
            } catch (e) {
              // Ignore
            }
          })
        } catch (e) {
          console.warn("Memory cleanup error:", e)
        }
      }

      // Initialize lightweight layers
      coreGoguardianBlocker()
      essentialDomProtection()
      basicChromeApiBlocking()
      simpleNetworkBlocking()

      // Set up lightweight intervals with adaptive timing
      adaptiveThrottler.setBaseDelay("lightweight-core", 500)
      adaptiveThrottler.setBaseDelay("lightweight-cleanup", 3000)

      const coreInterval = intervalManager.createInterval(
        coreGoguardianBlocker,
        adaptiveThrottler.getAdaptiveDelay("lightweight-core"),
        "lightweight-core",
      )

      const cleanupInterval = intervalManager.createInterval(
        minimalMemoryCleanup,
        adaptiveThrottler.getAdaptiveDelay("lightweight-cleanup"),
        "lightweight-cleanup",
      )

      if (coreInterval) intervals.current.push(coreInterval)
      if (cleanupInterval) intervals.current.push(cleanupInterval)

      isActive.current = true
      console.log("🛡️ LIGHTWEIGHT FORTRESS: Lightweight security active!")
    }

    initFortress()

    return () => {
      intervals.current.forEach((interval) => clearInterval(interval))
      observers.current.forEach((observer) => observer.disconnect())
      intervals.current = []
      observers.current = []
      isActive.current = false
    }
  }, [])

  return null
}
