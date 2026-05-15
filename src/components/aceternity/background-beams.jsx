import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const PATHS = [
  "M 100 800 Q 200 400 350 200 T 600 0",
  "M 200 900 Q 280 500 420 280 T 650 0",
  "M 350 900 Q 380 550 460 320 T 700 0",
  "M 500 950 Q 500 600 500 350 T 500 0",
  "M 650 900 Q 620 550 580 320 T 450 0",
  "M 800 900 Q 720 500 640 280 T 400 0",
  "M 950 800 Q 820 400 700 200 T 430 0",
]

function Beam({ path, delay, duration }) {
  return (
    <motion.path
      d={path}
      stroke="url(#beam-gradient)"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: [0, 1], opacity: [0, 0.5, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut', repeatDelay: Math.random() * 2 }}
    />
  )
}

export function BackgroundBeams({ className }) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full opacity-30"
      >
        <defs>
          <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(29,185,84,0)" />
            <stop offset="40%" stopColor="rgba(29,185,84,0.8)" />
            <stop offset="100%" stopColor="rgba(29,185,84,0)" />
          </linearGradient>
          <radialGradient id="beam-fade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="beam-mask">
            <rect width="100%" height="100%" fill="url(#beam-fade)" />
          </mask>
        </defs>
        <g mask="url(#beam-mask)">
          {PATHS.map((path, i) => (
            <Beam
              key={i}
              path={path}
              delay={i * 0.4}
              duration={3 + (i % 3) * 0.8}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}
