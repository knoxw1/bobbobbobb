"use client"

import { useEffect, useRef } from "react"

export function NuclearBlocker() {
  const intervalRef = useRef<NodeJS.Timeout>()
  const fastIntervalRef = useRef<NodeJS.Timeout>()
  const observerRef = useRef<MutationObserver>()

  useEffect(() => {
    // Nuclear option - completely destroy GoGuardian
    const nuclearStrike = () => {
      // 1. Kill all GoGuardian processes
      const killGoGuardian = () => {
        // Remove ALL elements with GoGuardian signatures
        const killSelectors = [
          '*[id*="goguardian" i]',
          '*[class*="goguardian" i]',
          "*[data-goguardian]",
          '*[src*="goguardian" i]',
          '*[href*="goguardian" i]',
          'script[src*="goguardian" i]',
          'iframe[src*="goguardian" i]',
          '*[id*="gg-"]',
          '*[class*="gg-"]',
          '*[id*="gg_"]',
          '*[class*="gg_"]',
          'div[style*="z-index: 2147483647"]',
          'div[style*="z-index: 999999"]',
          'div[style*="position: fixed"][style*="top: 0"]',
          'div[style*="position: absolute"][style*="top: 0"]',
          "*[data-extension-id]",
          "*[data-chrome-extension]",
          // More aggressive patterns
          'div[style*="width: 100%"][style*="height: 100%"][style*="position: fixed"]',
          'div[style*="left: 0"][style*="top: 0"][style*="position: fixed"]',
          '*[class*="extension"]',
          '*[id*="extension"]',
        ]

        killSelectors.forEach((selector) => {
          try {
            const elements = document.querySelectorAll(selector)
            elements.forEach((el) => {
              try {
                console.log(`🔥 NUKING: ${el.tagName} ${el.className} ${el.id}`)
                el.remove()
                // Also try to destroy the element more aggressively
                if (el.parentNode) {
                  el.parentNode.removeChild(el)
                }
              } catch (e) {
                // Force removal
                try {
                  ;(el as any).style.display = "none !important"
                  ;(el as any).style.visibility = "hidden !important"
                  ;(el as any).style.opacity = "0 !important"
                  ;(el as any).style.pointerEvents = "none !important"
                } catch (e2) {
                  // Ignore
                }
              }
            })
          } catch (e) {
            // Ignore selector errors
          }
        })

        // Kill all scripts containing GoGuardian code
        const scripts = document.querySelectorAll("script")
        scripts.forEach((script) => {
          const src = script.src?.toLowerCase() || ""
          const content = script.textContent?.toLowerCase() || ""
          if (
            src.includes("goguardian") ||
            src.includes("chrome-extension") ||
            content.includes("goguardian") ||
            content.includes("chrome-extension") ||
            content.includes("gg_") ||
            content.includes("gg-") ||
            content.includes("extension") ||
            content.includes("monitoring")
          ) {
            console.log(`🔥 SCRIPT KILL: ${script.src || "inline"}`)
            script.remove()
            // Also disable the script
            script.type = "text/disabled"
            script.textContent = ""
          }
        })
      }

      // 2. Poison the extension environment
      const poisonExtensions = () => {
        if (typeof window === "undefined") return

        // Completely destroy chrome extension API
        try {
          Object.defineProperty(window, "chrome", {
            get: () => {
              console.log("🔥 CHROME API ACCESS BLOCKED")
              throw new Error("Chrome API disabled")
            },
            set: () => {
              console.log("🔥 CHROME API SET BLOCKED")
              return false
            },
            configurable: false,
            enumerable: false,
          })
        } catch (e) {
          // If we can't redefine, poison it
          try {
            ;(window as any).chrome = new Proxy(
              {},
              {
                get: () => {
                  throw new Error("Extension API poisoned")
                },
                set: () => false,
                has: () => false,
                ownKeys: () => [],
                getOwnPropertyDescriptor: () => undefined,
              },
            )
          } catch (e2) {
            // Last resort
            ;(window as any).chrome = null
          }
        }

        // Poison all known GoGuardian globals
        const poisonGlobals = [
          "goguardian",
          "GoGuardian",
          "GOGUARDIAN",
          "gg",
          "GG",
          "__goguardian__",
          "_goguardian_",
          "_gg_",
          "ggExtension",
          "GoGuardianExtension",
          "extension",
          "Extension",
          "EXTENSION",
        ]

        poisonGlobals.forEach((global) => {
          try {
            Object.defineProperty(window, global, {
              get: () => {
                console.log(`🔥 POISONED GLOBAL ACCESS: ${global}`)
                throw new Error(`${global} has been poisoned`)
              },
              set: () => {
                console.log(`🔥 POISONED GLOBAL SET: ${global}`)
                return false
              },
              configurable: false,
              enumerable: false,
            })
          } catch (e) {
            // Fallback poisoning
            ;(window as any)[global] = new Proxy(
              {},
              {
                get: () => {
                  throw new Error(`${global} poisoned`)
                },
                set: () => false,
              },
            )
          }
        })
      }

      killGoGuardian()
      poisonExtensions()
    }

    // Ultra-aggressive DOM monitoring
    const setupUltraMonitoring = () => {
      if (observerRef.current) return

      observerRef.current = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          // Check added nodes
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element
              const id = (element.id || "").toLowerCase()
              const className = (element.className || "").toLowerCase()
              const tagName = element.tagName?.toLowerCase() || ""
              const src = (element.getAttribute("src") || "").toLowerCase()

              // Nuclear detection patterns
              if (
                id.includes("goguardian") ||
                className.includes("goguardian") ||
                id.includes("gg") ||
                className.includes("gg") ||
                id.includes("extension") ||
                className.includes("extension") ||
                src.includes("goguardian") ||
                src.includes("chrome-extension") ||
                element.getAttribute("data-goguardian") ||
                (tagName === "iframe" && src.includes("extension")) ||
                (tagName === "script" && src.includes("extension"))
              ) {
                console.log(`🔥 MUTATION KILL: ${element.tagName} ${element.id} ${element.className}`)
                element.remove()

                // Also try to kill parent if it looks suspicious
                const parent = element.parentElement
                if (
                  parent &&
                  (parent.id.toLowerCase().includes("gg") || parent.className.toLowerCase().includes("gg"))
                ) {
                  console.log(`🔥 PARENT KILL: ${parent.tagName} ${parent.id} ${parent.className}`)
                  parent.remove()
                }
              }

              // Check for suspicious overlays by style
              try {
                const computedStyle = window.getComputedStyle(element)
                const isOverlay =
                  computedStyle.position === "fixed" &&
                  (computedStyle.zIndex === "2147483647" ||
                    computedStyle.zIndex === "999999" ||
                    Number.parseInt(computedStyle.zIndex) > 1000000) &&
                  (computedStyle.top === "0px" || computedStyle.left === "0px") &&
                  (computedStyle.width.includes("100") || computedStyle.height.includes("100"))

                if (isOverlay) {
                  console.log(`🔥 OVERLAY KILL: ${element.tagName} z-index:${computedStyle.zIndex}`)
                  element.remove()
                }
              } catch (e) {
                // Ignore style errors
              }
            }
          })
        })
      })

      // Monitor everything
      observerRef.current.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeOldValue: true,
        characterData: true,
        characterDataOldValue: true,
      })
    }

    // Initialize nuclear strike
    nuclearStrike()
    setupUltraMonitoring()

    // Use smart interval wrapper if available
    const crashPrevention = (window as any).crashPrevention
    if (crashPrevention) {
      // Fast interval for immediate response
      fastIntervalRef.current = crashPrevention.smartIntervalWrapper.createSmartInterval(
        nuclearStrike,
        100,
        "nuclear-fast",
      )

      // Regular interval for maintenance
      intervalRef.current = crashPrevention.smartIntervalWrapper.createSmartInterval(
        nuclearStrike,
        500,
        "nuclear-regular",
      )
    } else {
      // Fallback to regular intervals
      fastIntervalRef.current = setInterval(nuclearStrike, 100)
      intervalRef.current = setInterval(nuclearStrike, 500)
    }

    // Cleanup
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (fastIntervalRef.current) clearInterval(fastIntervalRef.current)
      if (observerRef.current) observerRef.current.disconnect()
    }
  }, [])

  return null
}
