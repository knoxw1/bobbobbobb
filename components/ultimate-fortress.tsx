"use client"

import { useEffect, useRef } from "react"

export function UltimateFortress() {
  const intervals = useRef<NodeJS.Timeout[]>([])
  const observers = useRef<MutationObserver[]>([])
  const isInitialized = useRef(false)

  useEffect(() => {
    if (isInitialized.current) return

    // LAYER 1: BASIC SECURITY CONFIG
    const basicSecurity = () => {
      try {
        // Add security meta tags
        const addSecurityMeta = () => {
          const csp = document.createElement("meta")
          csp.httpEquiv = "Content-Security-Policy"
          csp.content = "frame-src 'self' https: http:; frame-ancestors 'none';"
          document.head.appendChild(csp)

          const xFrame = document.createElement("meta")
          xFrame.httpEquiv = "X-Frame-Options"
          xFrame.content = "SAMEORIGIN"
          document.head.appendChild(xFrame)

          const referrer = document.createElement("meta")
          referrer.name = "referrer"
          referrer.content = "no-referrer"
          document.head.appendChild(referrer)
        }
        addSecurityMeta()
        console.log("🛡️ BASIC SECURITY: Meta tags added")
      } catch (e) {
        console.warn("Basic security error:", e)
      }
    }

    // LAYER 2: GOGUARDIAN BLOCKER
    const goguardianBlocker = () => {
      try {
        const goguardianSelectors = [
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
          "*[data-extension-id]",
          "*[data-chrome-extension]",
          '*[class*="extension"]',
          '*[id*="extension"]',
        ]

        goguardianSelectors.forEach((selector) => {
          try {
            const elements = document.querySelectorAll(selector)
            elements.forEach((el) => {
              if (el && el.parentNode) {
                console.log("🔥 GOGUARDIAN BLOCKER: Removing", el.tagName, el.className, el.id)
                el.remove()
              }
            })
          } catch (e) {
            // Ignore selector errors
          }
        })

        // Block scripts
        const scripts = document.querySelectorAll("script")
        scripts.forEach((script) => {
          const src = script.src?.toLowerCase() || ""
          const content = script.textContent?.toLowerCase() || ""
          if (
            src.includes("goguardian") ||
            src.includes("chrome-extension") ||
            content.includes("goguardian") ||
            content.includes("chrome-extension")
          ) {
            console.log("🔥 GOGUARDIAN BLOCKER: Script blocked", script.src || "inline")
            script.remove()
          }
        })
      } catch (e) {
        console.warn("GoGuardian blocker error:", e)
      }
    }

    // LAYER 3: NUCLEAR BLOCKER
    const nuclearStrike = () => {
      try {
        // Poison extension globals
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
            if ((window as any)[global]) {
              ;(window as any)[global] = new Proxy(
                {},
                {
                  get: () => {
                    console.log(`🔥 NUCLEAR: Poisoned global access: ${global}`)
                    throw new Error(`${global} has been poisoned`)
                  },
                  set: () => false,
                },
              )
            }
          } catch (e) {
            // Ignore errors
          }
        })

        // Block chrome API
        try {
          if ((window as any).chrome) {
            ;(window as any).chrome = new Proxy(
              {},
              {
                get: () => {
                  console.log("🔥 NUCLEAR: Chrome API access blocked")
                  throw new Error("Chrome API destroyed")
                },
                set: () => false,
              },
            )
          }
        } catch (e) {
          // Ignore
        }
      } catch (e) {
        console.warn("Nuclear strike error:", e)
      }
    }

    // LAYER 4: QUANTUM DESTROYER
    const quantumDestruction = () => {
      try {
        // Override DOM methods
        if (!document.querySelector.toString().includes("quantum")) {
          const originalQuerySelector = document.querySelector
          document.querySelector = function (selector: string) {
            const sel = selector.toLowerCase()
            if (
              sel.includes("goguardian") ||
              sel.includes("gg-") ||
              sel.includes("extension") ||
              sel.includes("chrome-extension")
            ) {
              console.log(`🌌 QUANTUM: Blocked querySelector: ${selector}`)
              return null
            }
            return originalQuerySelector.call(this, selector)
          }

          const originalQuerySelectorAll = document.querySelectorAll
          document.querySelectorAll = function (selector: string) {
            const sel = selector.toLowerCase()
            if (
              sel.includes("goguardian") ||
              sel.includes("gg-") ||
              sel.includes("extension") ||
              sel.includes("chrome-extension")
            ) {
              console.log(`🌌 QUANTUM: Blocked querySelectorAll: ${selector}`)
              return document.createDocumentFragment().querySelectorAll("nonexistent") as any
            }
            return originalQuerySelectorAll.call(this, selector)
          }

          const originalGetElementById = document.getElementById
          document.getElementById = function (id: string) {
            const idLower = id.toLowerCase()
            if (idLower.includes("goguardian") || idLower.includes("gg-") || idLower.includes("extension")) {
              console.log(`🌌 QUANTUM: Blocked getElementById: ${id}`)
              return null
            }
            return originalGetElementById.call(this, id)
          }
        }

        // Override network methods
        if (!window.fetch.toString().includes("quantum")) {
          const originalFetch = window.fetch
          window.fetch = function (input: RequestInfo | URL, init?: RequestInit) {
            const url = input.toString().toLowerCase()
            if (
              url.includes("goguardian") ||
              url.includes("chrome-extension") ||
              url.includes("extension") ||
              url.includes("monitoring")
            ) {
              console.log(`🌌 QUANTUM: Network blocked: ${url}`)
              return new Promise(() => {}) // Never resolves
            }
            return originalFetch.call(this, input, init)
          }
        }
      } catch (e) {
        console.warn("Quantum destruction error:", e)
      }
    }

    // LAYER 5: STEALTH MODE
    const stealthMode = () => {
      try {
        // Hide our activities from extensions
        const hiddenProps = [
          "data-no-goguardian",
          "data-extension-blocked",
          "data-isolated",
          "data-protected",
          "data-anti-monitoring",
          "data-nuclear",
          "data-quantum-protected",
          "data-reality-distorted",
        ]

        const originalGetAttribute = Element.prototype.getAttribute
        Element.prototype.getAttribute = function (name: string) {
          if (hiddenProps.includes(name)) {
            return null
          }
          return originalGetAttribute.call(this, name)
        }

        // Make page look normal
        document.title = "Web Browser"
        console.log("👁️ STEALTH: Stealth mode activated")
      } catch (e) {
        console.warn("Stealth mode error:", e)
      }
    }

    // LAYER 6: MEMORY WIPER
    const memoryWiper = () => {
      try {
        // Clear extension storage
        const keysToWipe = []
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i)
          if (
            key &&
            (key.toLowerCase().includes("goguardian") ||
              key.toLowerCase().includes("extension") ||
              key.toLowerCase().includes("gg") ||
              key.toLowerCase().includes("monitoring"))
          ) {
            keysToWipe.push(key)
          }
        }
        keysToWipe.forEach((key) => {
          localStorage.removeItem(key)
          console.log(`🧹 MEMORY WIPER: Cleared localStorage: ${key}`)
        })

        // Clear session storage
        const sessionKeysToWipe = []
        for (let i = 0; i < sessionStorage.length; i++) {
          const key = sessionStorage.key(i)
          if (
            key &&
            (key.toLowerCase().includes("goguardian") ||
              key.toLowerCase().includes("extension") ||
              key.toLowerCase().includes("gg") ||
              key.toLowerCase().includes("monitoring"))
          ) {
            sessionKeysToWipe.push(key)
          }
        }
        sessionKeysToWipe.forEach((key) => {
          sessionStorage.removeItem(key)
          console.log(`🧹 MEMORY WIPER: Cleared sessionStorage: ${key}`)
        })

        // Clear cookies
        document.cookie.split(";").forEach((cookie) => {
          const eqPos = cookie.indexOf("=")
          const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim()
          if (
            name.toLowerCase().includes("goguardian") ||
            name.toLowerCase().includes("extension") ||
            name.toLowerCase().includes("gg") ||
            name.toLowerCase().includes("monitoring")
          ) {
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
            console.log(`🧹 MEMORY WIPER: Cleared cookie: ${name}`)
          }
        })
      } catch (e) {
        console.warn("Memory wiper error:", e)
      }
    }

    // LAYER 7: COMMUNICATION BLOCKER
    const communicationBlocker = () => {
      try {
        // Block postMessage
        if (!window.postMessage.toString().includes("blocked")) {
          const originalPostMessage = window.postMessage
          window.postMessage = function (message: any, targetOrigin: string, transfer?: Transferable[]) {
            const msgStr = JSON.stringify(message).toLowerCase()
            if (
              msgStr.includes("goguardian") ||
              msgStr.includes("extension") ||
              msgStr.includes("monitoring") ||
              msgStr.includes("gg_") ||
              msgStr.includes("gg-")
            ) {
              console.log("📡 COMMUNICATION BLOCKER: Blocked postMessage:", message)
              return
            }
            return originalPostMessage.call(this, message, targetOrigin, transfer)
          }
        }

        // Block addEventListener for extensions
        if (!EventTarget.prototype.addEventListener.toString().includes("blocked")) {
          const originalAddEventListener = EventTarget.prototype.addEventListener
          EventTarget.prototype.addEventListener = function (type: string, listener: any, options?: any) {
            if (typeof listener === "function") {
              const listenerStr = listener.toString().toLowerCase()
              if (
                listenerStr.includes("goguardian") ||
                listenerStr.includes("extension") ||
                listenerStr.includes("chrome-extension") ||
                listenerStr.includes("gg_") ||
                listenerStr.includes("gg-") ||
                listenerStr.includes("monitoring")
              ) {
                console.log(`📡 COMMUNICATION BLOCKER: Blocked event listener: ${type}`)
                return
              }
            }
            return originalAddEventListener.call(this, type, listener, options)
          }
        }
      } catch (e) {
        console.warn("Communication blocker error:", e)
      }
    }

    // LAYER 8: DOM WEAPONIZATION
    const domWeaponization = () => {
      try {
        // Override createElement
        if (!document.createElement.toString().includes("weaponized")) {
          const originalCreateElement = document.createElement
          document.createElement = function (tagName: string) {
            const element = originalCreateElement.call(this, tagName)

            const originalSetAttribute = element.setAttribute
            element.setAttribute = function (name: string, value: string) {
              const nameLower = name.toLowerCase()
              const valueLower = value.toLowerCase()
              if (
                valueLower.includes("goguardian") ||
                valueLower.includes("chrome-extension") ||
                valueLower.includes("extension") ||
                (nameLower === "id" && valueLower.includes("gg")) ||
                (nameLower === "class" && valueLower.includes("gg"))
              ) {
                console.log(`⚔️ DOM WEAPONIZATION: Blocked setAttribute: ${name}=${value}`)
                return originalSetAttribute.call(this, name, "weaponized-blocked")
              }
              return originalSetAttribute.call(this, name, value)
            }

            return element
          }
        }

        // Override appendChild
        if (!Node.prototype.appendChild.toString().includes("weaponized")) {
          const originalAppendChild = Node.prototype.appendChild
          const originalCreateElement = document.createElement // Declare the variable here
          Node.prototype.appendChild = function (child: any) {
            if (child && child.tagName) {
              const id = (child.id || "").toLowerCase()
              const className = (child.className || "").toLowerCase()
              const src = (child.src || "").toLowerCase()

              if (
                id.includes("goguardian") ||
                className.includes("goguardian") ||
                src.includes("goguardian") ||
                id.includes("gg") ||
                className.includes("gg") ||
                src.includes("chrome-extension")
              ) {
                console.log(`⚔️ DOM WEAPONIZATION: Blocked appendChild: ${child.tagName} ${child.id} ${child.className}`)
                const voidElement = originalCreateElement.call(document, "div")
                voidElement.style.display = "none"
                voidElement.setAttribute("data-weaponized-void", "true")
                return originalAppendChild.call(this, voidElement)
              }
            }
            return originalAppendChild.call(this, child)
          }
        }
      } catch (e) {
        console.warn("DOM weaponization error:", e)
      }
    }

    // LAYER 9: ULTRA MUTATION OBSERVER
    const setupUltraMutationObserver = () => {
      try {
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as Element
                const id = (element.id || "").toLowerCase()
                const className = (element.className || "").toLowerCase()
                const tagName = element.tagName?.toLowerCase() || ""
                const src = (element.getAttribute("src") || "").toLowerCase()

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
                  console.log(
                    `👁️ ULTRA OBSERVER: Mutation detected and blocked: ${element.tagName} ${element.id} ${element.className}`,
                  )
                  element.remove()

                  // Also check parent
                  const parent = element.parentElement
                  if (
                    parent &&
                    (parent.id.toLowerCase().includes("gg") || parent.className.toLowerCase().includes("gg"))
                  ) {
                    console.log(
                      `👁️ ULTRA OBSERVER: Parent also removed: ${parent.tagName} ${parent.id} ${parent.className}`,
                    )
                    parent.remove()
                  }
                }

                // Check for overlays
                try {
                  const computedStyle = window.getComputedStyle(element)
                  const isOverlay =
                    computedStyle.position === "fixed" &&
                    (Number.parseInt(computedStyle.zIndex) > 1000000 ||
                      computedStyle.zIndex === "2147483647" ||
                      computedStyle.zIndex === "999999") &&
                    (computedStyle.top === "0px" || computedStyle.left === "0px") &&
                    (computedStyle.width.includes("100") || computedStyle.height.includes("100"))

                  if (isOverlay) {
                    console.log(
                      `👁️ ULTRA OBSERVER: Overlay detected and removed: ${element.tagName} z-index:${computedStyle.zIndex}`,
                    )
                    element.remove()
                  }
                } catch (e) {
                  // Ignore style errors
                }
              }
            })
          })
        })

        observer.observe(document.documentElement, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeOldValue: true,
          characterData: true,
          characterDataOldValue: true,
        })

        observers.current.push(observer)
        console.log("👁️ ULTRA OBSERVER: Mutation observer activated")
      } catch (e) {
        console.warn("Ultra mutation observer error:", e)
      }
    }

    // INITIALIZE ALL LAYERS
    console.log("🚀 ULTIMATE FORTRESS: Initializing all protection layers...")

    // Immediate execution
    basicSecurity()
    goguardianBlocker()
    nuclearStrike()
    quantumDestruction()
    stealthMode()
    memoryWiper()
    communicationBlocker()
    domWeaponization()
    setupUltraMutationObserver()

    // Set up intervals for continuous protection
    intervals.current.push(setInterval(goguardianBlocker, 100)) // Every 100ms
    intervals.current.push(setInterval(nuclearStrike, 200)) // Every 200ms
    intervals.current.push(setInterval(quantumDestruction, 150)) // Every 150ms
    intervals.current.push(setInterval(memoryWiper, 1000)) // Every 1s
    intervals.current.push(setInterval(communicationBlocker, 300)) // Every 300ms
    intervals.current.push(setInterval(domWeaponization, 250)) // Every 250ms

    // Ultra-fast protection for critical elements
    intervals.current.push(setInterval(goguardianBlocker, 50)) // Every 50ms - ultra fast
    intervals.current.push(setInterval(nuclearStrike, 75)) // Every 75ms - ultra fast

    isInitialized.current = true
    console.log("🏰 ULTIMATE FORTRESS: All protection layers active!")

    // Cleanup
    return () => {
      intervals.current.forEach((interval) => clearInterval(interval))
      observers.current.forEach((observer) => observer.disconnect())
      intervals.current = []
      observers.current = []
      isInitialized.current = false
    }
  }, [])

  return null
}
