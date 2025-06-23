"use client"

import { useEffect } from "react"

export function SecurityConfig() {
  useEffect(() => {
    // Add meta tags for security
    const addSecurityMeta = () => {
      // Content Security Policy
      const csp = document.createElement("meta")
      csp.httpEquiv = "Content-Security-Policy"
      csp.content = "frame-src 'self' https: http:; frame-ancestors 'none';"
      document.head.appendChild(csp)

      // X-Frame-Options
      const xFrame = document.createElement("meta")
      xFrame.httpEquiv = "X-Frame-Options"
      xFrame.content = "SAMEORIGIN"
      document.head.appendChild(xFrame)

      // Referrer Policy
      const referrer = document.createElement("meta")
      referrer.name = "referrer"
      referrer.content = "no-referrer"
      document.head.appendChild(referrer)
    }

    // Block extension content scripts from accessing iframe
    const blockExtensionAccess = () => {
      // Create a MutationObserver to watch for extension injections
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element
              // Remove any extension-injected elements
              if (
                element.getAttribute("data-extension") ||
                element.className?.includes("extension") ||
                element.id?.includes("extension")
              ) {
                element.remove()
              }
            }
          })
        })
      })

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      })

      return observer
    }

    // Prevent extension script injection
    const preventScriptInjection = () => {
      const originalCreateElement = document.createElement
      document.createElement = function (tagName: string) {
        const element = originalCreateElement.call(this, tagName)

        if (tagName.toLowerCase() === "script") {
          // Block scripts that might be from extensions
          const originalSetAttribute = element.setAttribute
          element.setAttribute = function (name: string, value: string) {
            if (name === "src" && value.includes("extension://")) {
              console.warn("Blocked extension script injection")
              return
            }
            originalSetAttribute.call(this, name, value)
          }
        }

        return element
      }
    }

    addSecurityMeta()
    const observer = blockExtensionAccess()
    preventScriptInjection()

    // Cleanup
    return () => {
      observer.disconnect()
    }
  }, [])

  return null
}
