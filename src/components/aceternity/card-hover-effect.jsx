import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'

export function SpotlightCard({ children, className }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function onMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const background = useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, rgba(201,168,76,0.08), transparent 80%)`

  return (
    <div
      className={`group relative rounded-xl border border-[#1e1a30] bg-[#110f1e] overflow-hidden transition-all duration-200 hover:border-[rgba(201,168,76,0.3)] hover:-translate-y-0.5 ${className || ''}`}
      onMouseMove={onMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      {children}
    </div>
  )
}
