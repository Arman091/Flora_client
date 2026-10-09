// shadcn-style Button: variants + sizes, className overrides via twMerge.
// Colors come from design tokens (tailwind.config.js) — extend there, not here.
import * as React from "react";
import { cn } from "../../lib/cn";

const buttonVariants = {
  default: "bg-brand text-white hover:bg-brand-hover",
  destructive: "bg-error text-white hover:opacity-90",
  outline:
    "border border-border-primary bg-white text-text-primary hover:bg-bg-primary",
  secondary: "border border-border-primary bg-bg-primary text-text-primary hover:opacity-80",
  ghost: "text-text-primary hover:bg-bg-primary",
  link: "text-focus underline underline-offset-4 hover:opacity-80",
};

const buttonSizes = {
  default: "h-9 px-4 py-2 text-sm font-medium",
  sm: "h-8 px-3 text-xs font-medium",
  lg: "h-11 px-8 text-base font-medium",
  icon: "h-9 w-9",
};

const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants, buttonSizes };
export default Button;
