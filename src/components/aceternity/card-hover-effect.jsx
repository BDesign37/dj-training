import { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { cn } from '@/lib/utils'

export function SpotlightCard({ children, className }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function onMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const spotlightBg = useMotionTemplate`radial-gradient(240px circle at ${mouseX}px ${mouseY}px, rgba(201,168,76,0.07), transparent 80%)`
  const borderGlow  = useMotionTemplate`radial-gradient(180px circle at ${mouseX}px ${mouseY}px, rgba(201,168,76,0.28), transparent 80%)`

  return (
    <div
      onMouseMove={onMouseMove}
      className={cn(
        'group relative rounded-xl border border-[#1e1a30] bg-[#110f1e] overflow-hidden',
        'transition-all duration-200 ease-out',
        'hover:-translate-y-0.5 hover:border-[rgba(201,168,76,0.2)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.45),0_0_0_1px_rgba(201,168,76,0.05)]',
        className
      )}
    >
      {/* Spotlight fill */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlightBg }}
      />
      {/* Border glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: borderGlow,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '1px',
        }}
      />
      {children}
    </div>
  )
}
