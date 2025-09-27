import * as React from 'react'
import { clsx as cx } from 'clsx'

export function cn(...args: any[]) { return cx(args) }

export const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary'|'outline'|'ghost' }>(
  ({ className, variant = 'primary', ...props }, ref) => {
    const variants = {
      primary: 'btn btn-primary',
      outline: 'btn border border-black/20',
      ghost: 'btn btn-ghost',
    }
    return <button ref={ref} className={cn(variants[variant], className)} {...props} />
  }
)
Button.displayName = 'Button'
