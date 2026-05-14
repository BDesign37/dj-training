import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'

export const Tabs = TabsPrimitive.Root

export function TabsList({ className, ...props }) {
  return (
    <TabsPrimitive.List
      className={cn(
        'flex gap-px border-b border-[#242226]',
        className
      )}
      {...props}
    />
  )
}

export function TabsTrigger({ className, ...props }) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        'px-4 py-2.5 -mb-px font-mono text-[10px] tracking-widest uppercase text-[#7a7485]',
        'border-b-2 border-transparent transition-colors duration-150',
        'hover:text-[#c8c0d8]',
        'data-[state=active]:text-[#FFCF56] data-[state=active]:border-[#FFCF56]',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FFCF56]',
        className
      )}
      {...props}
    />
  )
}

export function TabsContent({ className, ...props }) {
  return (
    <TabsPrimitive.Content
      className={cn('pt-4 focus-visible:outline-none', className)}
      {...props}
    />
  )
}
