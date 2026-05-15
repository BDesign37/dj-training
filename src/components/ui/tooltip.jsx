import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cn } from '@/lib/utils'

export const TooltipProvider = TooltipPrimitive.Provider

export function Tooltip({ children, content, side = 'right', sideOffset = 8 }) {
  return (
    <TooltipPrimitive.Root delayDuration={300}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={side}
          sideOffset={sideOffset}
          className={cn(
            'z-50 px-2.5 py-1.5 rounded-md text-[11px] font-mono tracking-wide',
            'bg-[var(--border)] border border-[var(--border2)] text-[var(--text)]',
            'shadow-[0_4px_16px_rgba(0,0,0,0.5)]',
            'animate-in fade-in-0 zoom-in-95 duration-100',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95'
          )}
        >
          {content}
          <TooltipPrimitive.Arrow className="fill-[var(--border)]" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  )
}
