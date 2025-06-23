"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface IframeFortressProps {
  iframeRef: React.RefObject<HTMLIFrameElement>
}

export function IframeFortress({ iframeRef }: IframeFortressProps) {
  const protectionIntervalRef = useRef<NodeJS.Timeout>()
  const isProtected = useRef(false)

  useEffect(() => {
    const fortifyIframe = () => {
      if (!iframeRef.current || isProtected.current) return

      const iframe = iframeRef.current

      try {
        // Create an isolation wrapper
        const wrapper = iframe.parentElement
        if (wrapper) {
          wrapper.style.isolation = "isolate"
          wrapper.style.contain = "layout style paint"
          wrapper.style.position = "relative"
          wrapper.style.overflow = "hidden"
        }

        // Only try to redefine properties once
        if (!isProtected.current) {
          try {
            // Check if properties are already defined
            const descriptor = Object.getOwnPropertyDescriptor(iframe, "contentWindow")
            if (!descriptor || descriptor.configurable) {
              Object.defineProperty(iframe, "contentWindow", {
                get: () => {
                  console.log("Blocked contentWindow access attempt")
                  return null
                },
                set: () => {
                  console.log("Blocked contentWindow set attempt")
                },
                configurable: false,
                enumerable: false,
              })
            }
          } catch (e) {
            // Property already exists and is non-configurable
            console.log("contentWindow already protected")
          }

          try {
            const descriptor = Object.getOwnPropertyDescriptor(iframe, "contentDocument")
            if (!descriptor || descriptor.configurable) {
              Object.defineProperty(iframe, "contentDocument", {
                get: () => {
                  console.log("Blocked contentDocument access attempt")
                  return null
                },
                set: () => {
                  console.log("Blocked contentDocument set attempt")
                },
                configurable: false,
                enumerable: false,
              })
            }
          } catch (e) {
            // Property already exists and is non-configurable
            console.log("contentDocument already protected")
          }

          isProtected.current = true
        }

        // Enhanced sandbox with maximum restrictions
        const maxSandbox = [
          "allow-scripts",
          "allow-same-origin",
          "allow-forms",
          "allow-popups",
          "allow-popups-to-escape-sandbox",
          "allow-downloads",
        ].join(" ")

        if (iframe.getAttribute("sandbox") !== maxSandbox) {
          iframe.setAttribute("sandbox", maxSandbox)
        }

        // Add anti-extension attributes
        const antiExtensionAttrs = {
          "data-no-goguardian": "true",
          "data-extension-blocked": "true",
          "data-isolated": "true",
          "data-protected": "true",
          crossorigin: "anonymous",
          referrerpolicy: "no-referrer",
        }

        Object.entries(antiExtensionAttrs).forEach(([attr, value]) => {
          if (iframe.getAttribute(attr) !== value) {
            iframe.setAttribute(attr, value)
          }
        })

        // Create a protective overlay (invisible but blocks extension access)
        let overlay = wrapper?.querySelector(".protection-overlay") as HTMLElement
        if (!overlay && wrapper) {
          overlay = document.createElement("div")
          overlay.className = "protection-overlay"
          overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            background: transparent;
            isolation: isolate;
          `
          wrapper.appendChild(overlay)
        }

        // Override setAttribute only once
        if (!iframe.hasAttribute("data-setAttribute-protected")) {
          const originalSetAttribute = iframe.setAttribute
          iframe.setAttribute = function (name: string, value: string) {
            if (name === "src" && value.includes("goguardian")) {
              console.log("Blocked GoGuardian src injection")
              return
            }
            return originalSetAttribute.call(this, name, value)
          }
          iframe.setAttribute("data-setAttribute-protected", "true")
        }
      } catch (error) {
        // Only log non-property errors
        if (!error.message.includes("redefine property")) {
          console.warn("Iframe fortification error:", error)
        }
      }
    }

    // Fortify immediately
    fortifyIframe()

    // Use smart interval wrapper if available
    const crashPrevention = (window as any).crashPrevention
    if (crashPrevention) {
      protectionIntervalRef.current = crashPrevention.smartIntervalWrapper.createSmartInterval(
        () => {
          if (iframeRef.current) {
            // Just check attributes, don't redefine properties
            const iframe = iframeRef.current
            const requiredAttrs = {
              "data-no-goguardian": "true",
              "data-extension-blocked": "true",
              "data-isolated": "true",
              "data-protected": "true",
            }

            Object.entries(requiredAttrs).forEach(([attr, value]) => {
              if (iframe.getAttribute(attr) !== value) {
                iframe.setAttribute(attr, value)
              }
            })
          }
        },
        2000,
        "iframe-fortress",
      )
    } else {
      // Fallback to regular interval
      protectionIntervalRef.current = setInterval(() => {
        if (iframeRef.current) {
          const iframe = iframeRef.current
          const requiredAttrs = {
            "data-no-goguardian": "true",
            "data-extension-blocked": "true",
            "data-isolated": "true",
            "data-protected": "true",
          }

          Object.entries(requiredAttrs).forEach(([attr, value]) => {
            if (iframe.getAttribute(attr) !== value) {
              iframe.setAttribute(attr, value)
            }
          })
        }
      }, 2000)
    }

    return () => {
      if (protectionIntervalRef.current) {
        clearInterval(protectionIntervalRef.current)
      }
      isProtected.current = false
    }
  }, [iframeRef])

  return null
}
