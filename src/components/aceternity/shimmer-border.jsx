import { cn } from '@/lib/utils'

export function ShimmerBorder({ children, className }) {
  return (
    <div className={cn('relative rounded-xl p-px overflow-hidden', className)}>
      {/* Rotating conic gradient border */}
      <div
        className="absolute inset-0 rounded-xl"
        style={{
          background: 'conic-gradient(from 0deg, transparent 0deg, rgba(29,185,84,0.6) 60deg, rgba(30,215,96,0.4) 120deg, transparent 180deg, transparent 360deg)',
          animation: 'spin-slow 4s linear infinite',
        }}
      />
      {/* Subtle static inner glow */}
      <div
        className="absolute inset-0 rounded-xl"
        style={{ background: 'linear-gradient(135deg, rgba(29,185,84,0.06), transparent 50%, rgba(155,109,224,0.04))' }}
      />
      <div className="relative rounded-[11px] bg-[#181818]">
        {children}
      </div>
      <style>{`@keyframes spin-slow { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
