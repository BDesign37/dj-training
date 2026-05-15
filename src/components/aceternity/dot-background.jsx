export function DotBackground({ children, className }) {
  return (
    <div className={`relative ${className || ''}`}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(99,102,241,0.08) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />
      {children}
    </div>
  )
}
