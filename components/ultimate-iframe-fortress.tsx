"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface UltimateIframeFortressProps {
  iframeRef: React.RefObject<HTMLIFrameElement>
}

export function UltimateIframeFortress({ iframeRef }: UltimateIframeFortressProps) {
  const protectionIntervals = useRef<NodeJS.Timeout[]>([])
  const isProtected = useRef(false)

  useEffect(() => {
    const ultimateIframeProtection = () => {
      if (!iframeRef.current) return

      const iframe = iframeRef.current

      try {
        // LAYER 1: WRAPPER ISOLATION
        const wrapper = iframe.parentElement
        if (wrapper) {
          wrapper.style.cssText += `
            isolation: isolate !important;
            contain: layout style paint !important;
            position: relative !important;
            overflow: hidden !important;
            transform: translateZ(0) translate3d(0,0,0) !important;
            will-change: transform !important;
            backface-visibility: hidden !important;
            perspective: 1000px !important;
          `

          // Create multiple protection layers
          for (let i = 0; i < 10; i++) {
            let overlay = wrapper.querySelector(`.ultimate-protection-${i}`) as HTMLElement
            if (!overlay) {
              overlay = document.createElement("div")
              overlay.className = `ultimate-protection-${i}`
              overlay.style.cssText = `
                position: absolute !important;
                top: ${-i}px !important;
                left: ${-i}px !important;
                width: calc(100% + ${i * 2}px) !important;
                height: calc(100% + ${i * 2}px) !important;
                pointer-events: none !important;
                z-index: ${i + 1} !important;
                background: transparent !important;
                isolation: isolate !important;
                mix-blend-mode: normal !important;
                transform: translateZ(${i}px) rotate(${i * 0.1}deg) !important;
                will-change: transform !important;
                border: 1px solid rgba(0,0,0,0.001) !important;
              `
              overlay.setAttribute("data-ultimate-protection", "true")
              overlay.setAttribute("data-layer", i.toString())
              wrapper.appendChild(overlay)
            }
          }

          // Create quantum barriers
          for (let i = 0; i < 3; i++) {
            let barrier = wrapper.querySelector(`.quantum-barrier-${i}`) as HTMLElement
            if (!barrier) {
              barrier = document.createElement("div")
              barrier.className = `quantum-barrier-${i}`
              barrier.style.cssText = `
                position: absolute !important;
                top: ${-20 - i * 5}px !important;
                left: ${-20 - i * 5}px !important;
                width: calc(100% + ${40 + i * 10}px) !important;
                height: calc(100% + ${40 + i * 10}px) !important;
                pointer-events: none !important;
                z-index: ${100 + i} !important;
                border: 2px solid rgba(255,0,0,0.01) !important;
                background: linear-gradient(45deg, transparent, rgba(255,0,0,0.001), transparent) !important;
                isolation: isolate !important;
                transform: translateZ(${100 + i}px) !important;
              `
              barrier.setAttribute("data-quantum-barrier", "true")
              wrapper.appendChild(barrier)
            }
          }
        }

        // LAYER 2: IFRAME PROPERTY DESTRUCTION
        if (!isProtected.current) {
          try {
            // Complete property annihilation
            Object.defineProperty(iframe, "contentWindow", {
              get: () => {
                console.log("🏰 ULTIMATE FORTRESS: contentWindow access DESTROYED")
                return new Proxy(
                  {},
                  {
                    get: () => {
                      throw new Error("Ultimate fortress: contentWindow destroyed")
                    },
                    set: () => false,
                    has: () => false,
                    ownKeys: () => [],
                  },
                )
              },
              set: () => {
                console.log("🏰 ULTIMATE FORTRESS: contentWindow set BLOCKED")
                return false
              },
              configurable: false,
              enumerable: false,
            })

            Object.defineProperty(iframe, "contentDocument", {
              get: () => {
                console.log("🏰 ULTIMATE FORTRESS: contentDocument access DESTROYED")
                return null
              },
              set: () => {
                console.log("🏰 ULTIMATE FORTRESS: contentDocument set BLOCKED")
                return false
              },
              configurable: false,
              enumerable: false,
            })

            isProtected.current = true
          } catch (e) {
            console.log("🏰 ULTIMATE FORTRESS: Properties already protected")
          }
        }

        // LAYER 3: MAXIMUM SECURITY ATTRIBUTES
        const ultimateAttrs = {
          sandbox:
            "allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads",
          referrerpolicy: "no-referrer",
          crossorigin: "anonymous",
          loading: "lazy",
          "data-ultimate-fortress": "true",
          "data-no-goguardian": "true",
          "data-extension-blocked": "true",
          "data-isolated": "true",
          "data-protected": "true",
          "data-nuclear": "true",
          "data-quantum-protected": "true",
          "data-reality-distorted": "true",
          "data-weaponized": "true",
          "data-stealth": "true",
          "data-memory-wiped": "true",
          "data-communication-blocked": "true",
        }

        Object.entries(ultimateAttrs).forEach(([attr, value]) => {
          if (iframe.getAttribute(attr) !== value) {
            iframe.setAttribute(attr, value)
          }
        })

        // LAYER 4: METHOD OVERRIDES
        if (!iframe.hasAttribute("data-methods-overridden")) {
          const originalSetAttribute = iframe.setAttribute
          iframe.setAttribute = function (name: string, value: string) {
            const nameLower = name.toLowerCase()
            const valueLower = value.toLowerCase()
            if (
              valueLower.includes("goguardian") ||
              valueLower.includes("chrome-extension") ||
              valueLower.includes("extension") ||
              (nameLower === "src" && valueLower.includes("extension"))
            ) {
              console.log(`🏰 ULTIMATE FORTRESS: iframe setAttribute BLOCKED: ${name}=${value}`)
              return originalSetAttribute.call(this, name, "ultimate-fortress-blocked")
            }
            return originalSetAttribute.call(this, name, value)
          }

          // Block src changes
          try {
            const originalSrcSetter = Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype, "src")?.set
            if (originalSrcSetter) {
              Object.defineProperty(iframe, "src", {
                set: function (value: string) {
                  if (
                    value.toLowerCase().includes("goguardian") ||
                    value.toLowerCase().includes("chrome-extension") ||
                    value.toLowerCase().includes("extension")
                  ) {
                    console.log(`🏰 ULTIMATE FORTRESS: iframe src BLOCKED: ${value}`)
                    return
                  }
                  return originalSrcSetter.call(this, value)
                },
                get: () => iframe.getAttribute("src") || "",
                configurable: false,
              })
            }
          } catch (e) {
            console.log("🏰 ULTIMATE FORTRESS: src already protected")
          }

          iframe.setAttribute("data-methods-overridden", "true")
        }

        // LAYER 5: STYLE PROTECTION
        iframe.style.cssText += `
          isolation: isolate !important;
          contain: layout style paint !important;
          pointer-events: auto !important;
          transform: translateZ(0) !important;
          will-change: transform !important;
          backface-visibility: hidden !important;
        `
      } catch (error) {
        if (!error.message.includes("redefine")) {
          console.warn("Ultimate iframe fortress error:", error)
        }
      }
    }

    // Immediate protection
    ultimateIframeProtection()

    // Multiple protection intervals at different speeds
    protectionIntervals.current.push(setInterval(ultimateIframeProtection, 100)) // Every 100ms
    protectionIntervals.current.push(setInterval(ultimateIframeProtection, 250)) // Every 250ms
    protectionIntervals.current.push(setInterval(ultimateIframeProtection, 500)) // Every 500ms

    // Ultra-fast critical protection
    protectionIntervals.current.push(setInterval(ultimateIframeProtection, 50)) // Every 50ms

    return () => {
      protectionIntervals.current.forEach((interval) => clearInterval(interval))
      protectionIntervals.current = []
      isProtected.current = false
    }
  }, [iframeRef])

  return null
}
