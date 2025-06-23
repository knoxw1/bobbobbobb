"use client"

import { useEffect } from "react"

export function StealthMode() {
  useEffect(() => {
    // Make the page appear normal to avoid detection
    const enableStealthMode = () => {
      // Override console methods to hide our blocking messages from extensions
      const originalMethods = {
        log: console.log,
        warn: console.warn,
        error: console.error,
      }

      // Create a filtered console that hides our anti-extension messages
      console.log = (...args: any[]) => {
        const message = args[0]?.toString() || ""
        if (!message.includes("GoGuardian") && !message.includes("Blocked") && !message.includes("extension")) {
          originalMethods.log.apply(console, args)
        }
      }

      console.warn = (...args: any[]) => {
        const message = args[0]?.toString() || ""
        if (!message.includes("GoGuardian") && !message.includes("Blocked") && !message.includes("extension")) {
          originalMethods.warn.apply(console, args)
        }
      }

      // Hide the page title from showing anti-extension features
      document.title = "Web Browser"

      // Remove suspicious meta tags that might indicate anti-extension behavior
      const suspiciousMetas = document.querySelectorAll('meta[content*="extension"], meta[content*="goguardian"]')
      suspiciousMetas.forEach((meta) => meta.remove())

      // Make the page look like a normal browser
      const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement
      if (favicon) {
        favicon.href =
          "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' fontSize='90'>🌐</text></svg>"
      }
    }

    // Anti-detection measures
    const antiDetection = () => {
      // Prevent extensions from detecting our anti-extension code
      if (typeof window !== "undefined") {
        // Hide our custom properties
        const hiddenProps = [
          "data-no-goguardian",
          "data-extension-blocked",
          "data-isolated",
          "data-protected",
          "data-anti-monitoring",
        ]

        // Override getAttribute to hide our anti-extension attributes
        const originalGetAttribute = Element.prototype.getAttribute
        Element.prototype.getAttribute = function (name: string) {
          if (hiddenProps.includes(name)) {
            return null
          }
          return originalGetAttribute.call(this, name)
        }

        // Override querySelectorAll to hide our protected elements
        const originalQuerySelectorAll = document.querySelectorAll
        document.querySelectorAll = function (selector: string) {
          const results = originalQuerySelectorAll.call(this, selector)
          // Filter out our protection elements from extension queries
          if (selector.includes("data-") && hiddenProps.some((prop) => selector.includes(prop))) {
            return document.createNodeList ? document.createNodeList() : ([] as any)
          }
          return results
        }
      }
    }

    enableStealthMode()
    antiDetection()

    // Clean up on unmount
    return () => {
      document.title = "Anti-GoGuardian Browser Engine"
    }
  }, [])

  return null
}
