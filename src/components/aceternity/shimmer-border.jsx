export function ShimmerBorder({ children, className }) {
  return (
    <div className={`relative rounded-xl p-px overflow-hidden ${className || ''}`}>
      <div
        className="absolute inset-0 rounded-xl"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)',
          animation: 'shimmer 3s linear infinite',
          backgroundSize: '200% 100%',
        }}
      />
      <div className="relative rounded-xl bg-[#110f1e]">
        {children}
      </div>
      <style>{`@keyframes shimmer { from { background-position: -200% 0 } to { background-position: 200% 0 } }`}</style>
    </div>
  )
}
