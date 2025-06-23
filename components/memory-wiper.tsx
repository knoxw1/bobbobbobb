"use client"

import { useEffect, useRef } from "react"

export function MemoryWiper() {
  const wipingRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const wipeMemory = () => {
      // Clear all possible extension storage
      try {
        // Clear localStorage
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
          console.log(`🔥 WIPED LOCALSTORAGE: ${key}`)
        })

        // Clear sessionStorage
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
          console.log(`🔥 WIPED SESSIONSTORAGE: ${key}`)
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
            console.log(`🔥 WIPED COOKIE: ${name}`)
          }
        })

        // Clear any extension-related window properties
        Object.keys(window).forEach((key) => {
          if (
            key.toLowerCase().includes("goguardian") ||
            key.toLowerCase().includes("extension") ||
            key.toLowerCase().includes("gg") ||
            key.toLowerCase().includes("monitoring")
          ) {
            try {
              delete (window as any)[key]
              console.log(`🔥 WIPED WINDOW PROPERTY: ${key}`)
            } catch (e) {
              ;(window as any)[key] = undefined
            }
          }
        })
      } catch (e) {
        // Ignore errors
      }
    }

    // Immediate wipe
    wipeMemory()

    // Continuous wiping
    wipingRef.current = setInterval(wipeMemory, 1000)

    return () => {
      if (wipingRef.current) {
        clearInterval(wipingRef.current)
      }
    }
  }, [])

  return null
}
