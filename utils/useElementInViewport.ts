import { useState, useRef, useEffect } from "react"

export const useElementInViewport = (options) => {
  const elementRef = useRef(null)
  const [percentageInViewport, setPercentageInViewport] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const callback = (entries) => {
    const [entry] = entries
    setPercentageInViewport(entry.intersectionRatio)
    setIsVisible(entry.isIntersecting)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options)
    if (elementRef.current) observer.observe(elementRef.current)
    return () => observer.disconnect()
  }, [elementRef, options])

  return { elementRef, percentageInViewport, isVisible }
}

export function setGranularity(steps) {
  let thresholds = []

  for (let i = 1.0; i <= steps; i++) {
    let ratio = i / steps
    thresholds.push(ratio)
  }

  thresholds.push(0)
  return thresholds
}
