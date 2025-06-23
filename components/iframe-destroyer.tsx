"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface IframeDestroyerProps {
  iframeRef: React.RefObject<HTMLIFrameElement>
}

export function IframeDestroyer({ iframeRef }: IframeDestroyerProps) {
  const protectionRef = useRef<NodeJS.Timeout>()
  const isDestroyed = useRef(false)

  useEffect(() => {
    const destroyExtensionAccess = () => {
      if (!iframeRef.current) return

      const iframe = iframeRef.current

      try {
        // Create multiple layers of protection
        const wrapper = iframe.parentElement
        if (wrapper) {
          // Make wrapper completely isolated
          wrapper.style.cssText += `
            isolation: isolate !important;
            contain: layout style paint !important;
            position: relative !important;
            overflow: hidden !important;
            transform: translateZ(0) !important;
            will-change: transform !important;
          `

          // Create multiple protective overlays
          for (let i = 0; i < 3; i++) {
            let overlay = wrapper.querySelector(`.protection-overlay-${i}`) as HTMLElement
            if (!overlay) {
              overlay = document.createElement("div")
              overlay.className = `protection-overlay-${i}`
              overlay.style.cssText = `
                position: absolute !important;
                top: 0 !important;
                left: 0 !important;
                width: 100% !important;
                height: 100% !important;
                pointer-events: none !important;
                z-index: ${i + 1} !important;
                background: transparent !important;
                isolation: isolate !important;
                mix-blend-mode: normal !important;
              `
              wrapper.appendChild(overlay)
            }
          }
        }

        // Nuclear iframe protection
        if (!isDestroyed.current) {
          // Completely destroy access methods
          try {
            delete (iframe as any).contentWindow
            delete (iframe as any).contentDocument
          } catch (e) {
            // If delete fails, poison them
            try {
              Object.defineProperty(iframe, "contentWindow", {
                get: () => {
                  console.log("🔥 IFRAME ACCESS DESTROYED")
                  throw new Error("Access destroyed")
                },
                set: () => false,
                configurable: false,
              })
              Object.defineProperty(iframe, "contentDocument", {
                get: () => {
                  console.log("🔥 IFRAME DOCUMENT DESTROYED")
                  throw new Error("Document access destroyed")
                },
                set: () => false,
                configurable: false,
              })
            } catch (e2) {
              // Last resort - make them null
              ;(iframe as any).contentWindow = null
              ;(iframe as any).contentDocument = null
            }
          }

          isDestroyed.current = true
        }

        // Maximum security sandbox
        const nuclearSandbox = [
          "allow-scripts",
          "allow-same-origin",
          "allow-forms",
          "allow-popups",
          "allow-popups-to-escape-sandbox",
          "allow-downloads",
        ].join(" ")

        iframe.setAttribute("sandbox", nuclearSandbox)

        // Nuclear security attributes
        const nuclearAttrs = {
          "data-no-goguardian": "true",
          "data-extension-blocked": "true",
          "data-isolated": "true",
          "data-protected": "true",
          "data-nuclear": "true",
          "data-destroyed": "true",
          crossorigin: "anonymous",
          referrerpolicy: "no-referrer",
          loading: "lazy",
        }

        Object.entries(nuclearAttrs).forEach(([attr, value]) => {
          iframe.setAttribute(attr, value)
        })

        // Destroy any extension manipulation attempts
        const originalSetAttribute = iframe.setAttribute
        iframe.setAttribute = function (name: string, value: string) {
          if (
            value.toLowerCase().includes("goguardian") ||
            value.toLowerCase().includes("chrome-extension") ||
            value.toLowerCase().includes("extension") ||
            name.toLowerCase().includes("gg")
          ) {
            console.log(`🔥 IFRAME ATTRIBUTE BLOCKED: ${name}=${value}`)
            return
          }
          return originalSetAttribute.call(this, name, value)
        }

        // Block src changes to extension URLs
        const originalSrcSetter = Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype, "src")?.set
        if (originalSrcSetter) {
          Object.defineProperty(iframe, "src", {
            set: function (value: string) {
              if (
                value.toLowerCase().includes("goguardian") ||
                value.toLowerCase().includes("chrome-extension") ||
                value.toLowerCase().includes("extension")
              ) {
                console.log(`🔥 IFRAME SRC BLOCKED: ${value}`)
                return
              }
              return originalSrcSetter.call(this, value)
            },
            get: () => iframe.getAttribute("src") || "",
            configurable: false,
          })
        }
      } catch (error) {
        if (!error.message.includes("redefine")) {
          console.warn("Iframe destruction error:", error)
        }
      }
    }

    // Immediate destruction
    destroyExtensionAccess()

    // Continuous destruction
    protectionRef.current = setInterval(destroyExtensionAccess, 200)

    return () => {
      if (protectionRef.current) {
        clearInterval(protectionRef.current)
      }
      isDestroyed.current = false
    }
  }, [iframeRef])

  return null
}
