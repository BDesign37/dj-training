import { useRef } from 'react'
import { motion, useAnimationFrame, useMotionTemplate, useMotionValue, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

export function MovingBorder({ children, duration = 3000, className, containerClassName, borderClassName, rx = 10 }) {
  const pathRef = useRef(null)
  const progress = useMotionValue(0)

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength()
    if (length) {
      const pxPerMs = length / duration
      progress.set((time * pxPerMs) % length)
    }
  })

  const x = useTransform(progress, (v) => pathRef.current?.getPointAtLength(v).x ?? 0)
  const y = useTransform(progress, (v) => pathRef.current?.getPointAtLength(v).y ?? 0)
  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`

  return (
    <div className={cn('relative p-px overflow-hidden', containerClassName)} style={{ borderRadius: rx }}>
      {/* Animated border layer */}
      <div className="absolute inset-0" style={{ borderRadius: rx }}>
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <rect
            ref={pathRef}
            width="100%"
            height="100%"
            rx={rx}
            ry={rx}
            fill="none"
          />
        </svg>
        <motion.div
          className={cn(
            'absolute h-16 w-16 opacity-70',
            borderClassName
          )}
          style={{
            top: 0,
            left: 0,
            transform,
            background: 'radial-gradient(circle at center, rgba(99,102,241,0.9) 0%, rgba(99,102,241,0.3) 40%, transparent 70%)',
          }}
        />
      </div>
      {/* Static border fallback */}
      <div
        className="absolute inset-0 opacity-20"
        style={{ borderRadius: rx, border: '1px solid rgba(99,102,241,0.4)' }}
      />
      {/* Content */}
      <div className={cn('relative', className)} style={{ borderRadius: rx - 1 }}>
        {children}
      </div>
    </div>
  )
}
