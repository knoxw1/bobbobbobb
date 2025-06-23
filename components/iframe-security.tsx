"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface IframeSecurityProps {
  iframeRef: React.RefObject<HTMLIFrameElement>
}

export function IframeSecurity({ iframeRef }: IframeSecurityProps) {
  const securityIntervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const enforceIframeSecurity = () => {
      if (!iframeRef.current) return

      const iframe = iframeRef.current

      try {
        // Prevent extension access to iframe content
        Object.defineProperty(iframe, "contentWindow", {
          get: () => null,
          configurable: false,
        })

        Object.defineProperty(iframe, "contentDocument", {
          get: () => null,
          configurable: false,
        })

        // Add security attributes if they're missing
        const securityAttrs = {
          "data-no-extension": "true",
          "data-isolated": "true",
          "data-security-enforced": "true",
        }

        Object.entries(securityAttrs).forEach(([attr, value]) => {
          if (!iframe.getAttribute(attr)) {
            iframe.setAttribute(attr, value)
          }
        })

        // Ensure sandbox is properly set
        const requiredSandbox = [
          "allow-scripts",
          "allow-same-origin",
          "allow-forms",
          "allow-popups",
          "allow-popups-to-escape-sandbox",
          "allow-downloads",
        ].join(" ")

        if (iframe.getAttribute("sandbox") !== requiredSandbox) {
          iframe.setAttribute("sandbox", requiredSandbox)
        }
      } catch (error) {
        console.warn("Security enforcement error:", error)
      }
    }

    // Use smart interval wrapper if available
    const crashPrevention = (window as any).crashPrevention
    if (crashPrevention) {
      securityIntervalRef.current = crashPrevention.smartIntervalWrapper.createSmartInterval(
        enforceIframeSecurity,
        1000,
        "iframe-security",
      )
    } else {
      // Fallback to regular interval
      enforceIframeSecurity()
      securityIntervalRef.current = setInterval(enforceIframeSecurity, 1000)
    }

    return () => {
      if (securityIntervalRef.current) {
        clearInterval(securityIntervalRef.current)
      }
    }
  }, [iframeRef])

  return null
}
