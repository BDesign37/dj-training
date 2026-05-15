import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cn } from '@/lib/utils'

export function Progress({ value = 0, className }) {
  return (
    <ProgressPrimitive.Root
      className={cn(
        'relative h-[2px] w-full overflow-hidden rounded-full bg-[#282828]',
        className
      )}
      value={value}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 rounded-full transition-all duration-500 ease-out"
        style={{
          transform: `translateX(-${100 - value}%)`,
          background: '#1db954',
        }}
      />
    </ProgressPrimitive.Root>
  )
}
