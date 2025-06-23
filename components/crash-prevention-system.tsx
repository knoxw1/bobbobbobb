"use client"

import { useEffect, useRef } from "react"

export function CrashPreventionSystem() {
  const isActive = useRef(false)
  const performanceMonitor = useRef<any>(null)

  useEffect(() => {
    if (isActive.current) return

    // CRASH PREVENTION LAYER 1: PERFORMANCE MONITORING
    const performanceManager = {
      metrics: {
        cpuUsage: 0,
        memoryUsage: 0,
        intervalCount: 0,
        lastCheck: Date.now(),
      },

      monitor: () => {
        try {
          // Monitor performance metrics
          const now = Date.now()
          const timeDiff = now - performanceManager.metrics.lastCheck

          // Estimate CPU usage based on interval frequency
          performanceManager.metrics.cpuUsage = Math.min(100, performanceManager.metrics.intervalCount * 0.1)

          // Estimate memory usage
          if ((performance as any).memory) {
            const memory = (performance as any).memory
            performanceManager.metrics.memoryUsage = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100
          }

          performanceManager.metrics.lastCheck = now
          performanceManager.metrics.intervalCount = 0

          console.log(
            `🔧 CRASH-PREVENTION: CPU: ${performanceManager.metrics.cpuUsage.toFixed(1)}%, Memory: ${performanceManager.metrics.memoryUsage.toFixed(1)}%`,
          )

          // Auto-throttle if performance is poor
          if (performanceManager.metrics.cpuUsage > 80 || performanceManager.metrics.memoryUsage > 80) {
            console.log("🔧 CRASH-PREVENTION: High resource usage detected, auto-throttling")
            performanceManager.throttle()
          }
        } catch (e) {
          console.warn("Performance monitoring error:", e)
        }
      },

      throttle: () => {
        // Reduce interval frequency by increasing delays
        console.log("🔧 CRASH-PREVENTION: Throttling intervals to prevent crash")

        // Signal other systems to slow down
        window.dispatchEvent(
          new CustomEvent("throttle-security", {
            detail: { reason: "performance" },
          }),
        )
      },

      incrementInterval: () => {
        performanceManager.metrics.intervalCount++
      },
    }

    // CRASH PREVENTION LAYER 2: MEMORY MANAGEMENT
    const memoryManager = {
      cache: new Map(),
      maxCacheSize: 1000,

      cleanup: () => {
        try {
          // Clear old cache entries
          if (memoryManager.cache.size > memoryManager.maxCacheSize) {
            const entries = Array.from(memoryManager.cache.entries())
            const toDelete = entries.slice(0, entries.length - memoryManager.maxCacheSize)

            toDelete.forEach(([key]) => {
              memoryManager.cache.delete(key)
            })

            console.log(`🔧 CRASH-PREVENTION: Cleaned ${toDelete.length} cache entries`)
          }

          // Force garbage collection if available
          if ((window as any).gc) {
            ;(window as any).gc()
            console.log("🔧 CRASH-PREVENTION: Forced garbage collection")
          }
        } catch (e) {
          console.warn("Memory cleanup error:", e)
        }
      },

      store: (key: string, value: any) => {
        if (memoryManager.cache.size < memoryManager.maxCacheSize) {
          memoryManager.cache.set(key, value)
        }
      },

      get: (key: string) => {
        return memoryManager.cache.get(key)
      },
    }

    // CRASH PREVENTION LAYER 3: ERROR HANDLING
    const errorHandler = {
      errorCount: 0,
      maxErrors: 100, // Increased to allow more errors before throttling

      handleError: (error: any, context: string) => {
        errorHandler.errorCount++

        if (errorHandler.errorCount > errorHandler.maxErrors) {
          console.log("🔧 CRASH-PREVENTION: Too many errors, entering safe mode")
          errorHandler.enterSafeMode()
        } else {
          console.log(`🔧 CRASH-PREVENTION: Error handled in ${context}:`, error.message)
        }
      },

      enterSafeMode: () => {
        // Reduce security system intensity but don't disable
        window.dispatchEvent(
          new CustomEvent("enter-safe-mode", {
            detail: { reason: "too-many-errors" },
          }),
        )

        // Reset error count after safe mode
        setTimeout(() => {
          errorHandler.errorCount = 0
          console.log("🔧 CRASH-PREVENTION: Error count reset")
        }, 10000)
      },
    }

    // CRASH PREVENTION LAYER 4: SMART INTERVAL WRAPPER
    const smartIntervalWrapper = {
      createSmartInterval: (callback: () => void, delay: number, name: string) => {
        const wrappedCallback = () => {
          try {
            performanceManager.incrementInterval()

            // Only throttle if performance is really bad
            if (performanceManager.metrics.cpuUsage < 90 && performanceManager.metrics.memoryUsage < 90) {
              callback()
            } else {
              console.log(`🔧 CRASH-PREVENTION: Skipping ${name} due to high resource usage`)
            }
          } catch (e) {
            errorHandler.handleError(e, name)
          }
        }

        // Minimum delay to prevent browser lock-up
        const safeDelay = Math.max(delay, 10)
        return setInterval(wrappedCallback, safeDelay)
      },
    }

    // Expose managers globally for other components
    ;(window as any).crashPrevention = {
      memoryManager,
      performanceManager,
      errorHandler,
      smartIntervalWrapper,
    }

    // Start performance monitoring
    performanceMonitor.current = setInterval(() => {
      performanceManager.monitor()
      memoryManager.cleanup()
    }, 2000) // Check every 2 seconds

    isActive.current = true
    console.log("🔧 CRASH-PREVENTION: Crash prevention system initialized")

    return () => {
      if (performanceMonitor.current) {
        clearInterval(performanceMonitor.current)
      }
      isActive.current = false
    }
  }, [])

  return null
}
