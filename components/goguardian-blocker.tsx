"use client"

import { useEffect, useRef } from "react"

export function GoGuardianBlocker() {
  const intervalRef = useRef<NodeJS.Timeout>()
  const observerRef = useRef<MutationObserver>()
  const isInitialized = useRef(false)

  useEffect(() => {
    // Comprehensive GoGuardian blocking
    const blockGoGuardian = () => {
      // Block known GoGuardian selectors and identifiers
      const goguardianSelectors = [
        '[id*="goguardian"]',
        '[class*="goguardian"]',
        "[data-goguardian]",
        '[src*="goguardian"]',
        '[href*="goguardian"]',
        'script[src*="goguardian"]',
        'iframe[src*="goguardian"]',
        ".gg-",
        "#gg-",
        '[id*="gg-"]',
        '[class*="gg-"]',
        'div[style*="z-index: 2147483647"]', // Common overlay z-index
        'div[style*="position: fixed"][style*="top: 0"]',
        "[data-extension-id]",
        "[data-chrome-extension]",
        // Additional GoGuardian patterns
        '[class*="GoGuardian"]',
        '[id*="GoGuardian"]',
        'div[style*="position: absolute"][style*="z-index: 999999"]',
        'div[style*="position: fixed"][style*="z-index: 999999"]',
      ]

      // Remove GoGuardian elements
      goguardianSelectors.forEach((selector) => {
        try {
          const elements = document.querySelectorAll(selector)
          elements.forEach((el) => {
            if (el && el.parentNode) {
              console.log("Removing GoGuardian element:", el.tagName, el.className, el.id)
              el.remove()
            }
          })
        } catch (e) {
          // Ignore selector errors
        }
      })

      // Block GoGuardian scripts more aggressively
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
          content.includes("GoGuardian")
        ) {
          console.log("Blocking GoGuardian script:", script.src || "inline")
          script.remove()
        }
      })
    }

    // Override document methods to prevent GoGuardian injection (only once)
    const overrideDocumentMethods = () => {
      if (isInitialized.current) return

      try {
        const originalCreateElement = document.createElement
        document.createElement = function (tagName: string) {
          const element = originalCreateElement.call(this, tagName)

          // Block GoGuardian element creation
          const originalSetAttribute = element.setAttribute
          element.setAttribute = function (name: string, value: string) {
            if (
              value.toLowerCase().includes("goguardian") ||
              value.toLowerCase().includes("chrome-extension") ||
              (name === "id" && value.includes("gg")) ||
              (name === "class" && value.includes("gg"))
            ) {
              console.log("Blocked GoGuardian attribute:", name, value)
              return
            }
            return originalSetAttribute.call(this, name, value)
          }

          return element
        }

        // Override appendChild to block GoGuardian elements
        if (document.body && document.body.appendChild) {
          const originalAppendChild = document.body.appendChild
          document.body.appendChild = function (child: any) {
            if (child && child.tagName) {
              const id = child.id || ""
              const className = child.className || ""
              const src = child.src || ""

              if (
                id.toLowerCase().includes("goguardian") ||
                className.toLowerCase().includes("goguardian") ||
                src.toLowerCase().includes("goguardian") ||
                id.includes("gg") ||
                className.includes("gg")
              ) {
                console.log("Blocked GoGuardian appendChild:", child.tagName, child.id, child.className)
                return child
              }
            }
            return originalAppendChild.call(this, child)
          }
        }
      } catch (e) {
        console.warn("Failed to override document methods:", e)
      }
    }

    // Advanced DOM protection
    const setupDOMProtection = () => {
      if (observerRef.current) return // Already set up

      // Create a MutationObserver to watch for GoGuardian injections
      observerRef.current = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element
              const id = element.id || ""
              const className = element.className || ""
              const tagName = element.tagName?.toLowerCase() || ""

              // Check for GoGuardian patterns
              if (
                id.toLowerCase().includes("goguardian") ||
                className.toLowerCase().includes("goguardian") ||
                id.includes("gg") ||
                className.includes("gg") ||
                element.getAttribute("data-goguardian") ||
                (tagName === "iframe" && element.getAttribute("src")?.toLowerCase().includes("goguardian")) ||
                (tagName === "script" && element.getAttribute("src")?.toLowerCase().includes("goguardian"))
              ) {
                console.log(
                  "GoGuardian injection detected and blocked:",
                  element.tagName,
                  element.id,
                  element.className,
                )
                element.remove()
              }

              // Check for suspicious overlay elements
              try {
                const style = window.getComputedStyle(element)
                if (
                  style.position === "fixed" &&
                  (style.zIndex === "2147483647" || style.zIndex === "999999") &&
                  (style.top === "0px" || style.left === "0px") &&
                  (style.width === "100%" || style.width.includes("100"))
                ) {
                  console.log("Suspicious overlay detected and removed:", element.tagName, element.className)
                  element.remove()
                }
              } catch (e) {
                // Ignore style computation errors
              }
            }
          })
        })
      })

      observerRef.current.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["id", "class", "src", "data-goguardian", "style"],
      })
    }

    // Block extension APIs (only once)
    const blockExtensionAPIs = () => {
      if (typeof window !== "undefined") {
        // Block chrome extension API
        try {
          if ((window as any).chrome && !(window as any).chrome._blocked) {
            const originalChrome = (window as any).chrome
            ;(window as any).chrome = new Proxy(
              {},
              {
                get: () => {
                  console.log("Blocked chrome extension API access")
                  return undefined
                },
                set: () => {
                  console.log("Blocked chrome extension API modification")
                  return true
                },
              },
            )
            ;(window as any).chrome._blocked = true
            console.log("Blocked chrome extension API")
          }
        } catch (e) {
          console.warn("Failed to block chrome API:", e)
        }

        // Block common extension globals
        const extensionGlobals = [
          "goguardian",
          "GoGuardian",
          "GOGUARDIAN",
          "gg",
          "GG",
          "__goguardian__",
          "_goguardian_",
          "_gg_",
          "ggExtension",
        ]

        extensionGlobals.forEach((global) => {
          try {
            if ((window as any)[global]) {
              ;(window as any)[global] = undefined
              console.log(`Blocked extension global: ${global}`)
            }
          } catch (e) {
            // Ignore errors
          }
        })
      }
    }

    // Initialize all blocking mechanisms
    blockGoGuardian()
    overrideDocumentMethods()
    setupDOMProtection()
    blockExtensionAPIs()
    isInitialized.current = true

    // Use smart interval wrapper if available
    const crashPrevention = (window as any).crashPrevention
    if (crashPrevention) {
      intervalRef.current = crashPrevention.smartIntervalWrapper.createSmartInterval(
        () => {
          blockGoGuardian()
          blockExtensionAPIs()
        },
        1000,
        "goguardian-blocker",
      )
    } else {
      // Fallback to regular interval
      intervalRef.current = setInterval(() => {
        blockGoGuardian()
        blockExtensionAPIs()
      }, 1000)
    }

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
      isInitialized.current = false
    }
  }, [])

  return null
}
