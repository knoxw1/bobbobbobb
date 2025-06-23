"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface RealityDistorterProps {
  iframeRef: React.RefObject<HTMLIFrameElement>
}

export function RealityDistorter({ iframeRef }: RealityDistorterProps) {
  const distortionRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const distortReality = () => {
      if (!iframeRef.current) return

      const iframe = iframeRef.current

      try {
        // Reality distortion field around iframe
        const wrapper = iframe.parentElement
        if (wrapper) {
          // Create quantum isolation field
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

          // Create reality distortion overlays
          for (let i = 0; i < 5; i++) {
            let overlay = wrapper.querySelector(`.reality-distortion-${i}`) as HTMLElement
            if (!overlay) {
              overlay = document.createElement("div")
              overlay.className = `reality-distortion-${i}`
              overlay.style.cssText = `
                position: absolute !important;
                top: 0 !important;
                left: 0 !important;
                width: 100% !important;
                height: 100% !important;
                pointer-events: none !important;
                z-index: ${i + 10} !important;
                background: transparent !important;
                isolation: isolate !important;
                mix-blend-mode: normal !important;
                transform: translateZ(${i}px) !important;
                will-change: transform !important;
              `
              overlay.setAttribute("data-reality-distortion", "true")
              overlay.setAttribute("data-layer", i.toString())
              wrapper.appendChild(overlay)
            }
          }

          // Create quantum barrier
          let barrier = wrapper.querySelector(".quantum-barrier") as HTMLElement
          if (!barrier) {
            barrier = document.createElement("div")
            barrier.className = "quantum-barrier"
            barrier.style.cssText = `
              position: absolute !important;
              top: -10px !important;
              left: -10px !important;
              width: calc(100% + 20px) !important;
              height: calc(100% + 20px) !important;
              pointer-events: none !important;
              z-index: 100 !important;
              border: 2px solid transparent !important;
              background: linear-gradient(45deg, transparent, rgba(255,0,0,0.01), transparent) !important;
              isolation: isolate !important;
            `
            barrier.setAttribute("data-quantum-barrier", "true")
            wrapper.appendChild(barrier)
          }
        }

        // Reality distortion of iframe properties
        try {
          // Create quantum void for contentWindow
          if (!iframe.hasAttribute("data-reality-distorted")) {
            Object.defineProperty(iframe, "contentWindow", {
              get: () => {
                console.log("🌀 REALITY DISTORTION: contentWindow access blocked")
                // Return a reality-distorted object that breaks extension access
                return new Proxy(
                  {},
                  {
                    get: (target, prop) => {
                      console.log(`🌀 REALITY DISTORTION: contentWindow.${String(prop)} blocked`)
                      if (prop === "document") {
                        return new Proxy(
                          {},
                          {
                            get: () => {
                              throw new Error("Reality distortion: document access blocked")
                            },
                          },
                        )
                      }
                      throw new Error(`Reality distortion: ${String(prop)} blocked`)
                    },
                    set: () => {
                      console.log("🌀 REALITY DISTORTION: contentWindow set blocked")
                      return false
                    },
                    has: () => false,
                    ownKeys: () => [],
                  },
                )
              },
              set: () => {
                console.log("🌀 REALITY DISTORTION: contentWindow set attempt blocked")
                return false
              },
              configurable: false,
              enumerable: false,
            })

            // Create quantum void for contentDocument
            Object.defineProperty(iframe, "contentDocument", {
              get: () => {
                console.log("🌀 REALITY DISTORTION: contentDocument access blocked")
                return null
              },
              set: () => {
                console.log("🌀 REALITY DISTORTION: contentDocument set blocked")
                return false
              },
              configurable: false,
              enumerable: false,
            })

            iframe.setAttribute("data-reality-distorted", "true")
          }
        } catch (e) {
          // If property redefinition fails, the iframe is already protected
          console.log("🌀 REALITY DISTORTION: iframe already protected")
        }

        // Reality distortion of iframe methods
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
            console.log(`🌀 REALITY DISTORTION: iframe setAttribute blocked: ${name}=${value}`)
            // Distort the value
            return originalSetAttribute.call(this, name, "reality-distorted")
          }
          return originalSetAttribute.call(this, name, value)
        }

        // Maximum security attributes
        const realityAttrs = {
          "data-reality-distorted": "true",
          "data-quantum-protected": "true",
          "data-no-goguardian": "true",
          "data-extension-blocked": "true",
          "data-isolated": "true",
          sandbox:
            "allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads",
          referrerpolicy: "no-referrer",
          crossorigin: "anonymous",
        }

        Object.entries(realityAttrs).forEach(([attr, value]) => {
          if (iframe.getAttribute(attr) !== value) {
            iframe.setAttribute(attr, value)
          }
        })
      } catch (error) {
        if (!error.message.includes("redefine")) {
          console.warn("Reality distortion error:", error)
        }
      }
    }

    // Immediate reality distortion
    distortReality()

    // Continuous reality distortion
    distortionRef.current = setInterval(distortReality, 100)

    return () => {
      if (distortionRef.current) {
        clearInterval(distortionRef.current)
      }
    }
  }, [iframeRef])

  return null
}
