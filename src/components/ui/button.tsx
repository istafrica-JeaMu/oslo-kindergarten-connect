
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-oslo-blue text-white hover:bg-oslo-blue/90 shadow-md hover:shadow-lg",
        destructive: "bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg",
        outline: "border-2 border-oslo-blue text-oslo-blue bg-white hover:bg-oslo-blue hover:text-white shadow-sm hover:shadow-md",
        secondary: "bg-oslo-gray text-oslo-blue hover:bg-slate-200 shadow-sm hover:shadow-md",
        ghost: "text-oslo-blue hover:bg-oslo-blue/10 hover:text-oslo-blue",
        link: "text-oslo-blue underline-offset-4 hover:underline hover:text-oslo-blue/80",
        success: "bg-oslo-green text-white hover:bg-oslo-green/90 shadow-md hover:shadow-lg",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-13 rounded-xl px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
