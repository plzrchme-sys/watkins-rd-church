import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

const buttonStyles = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-colors duration-200 disabled:opacity-50",
  {
    variants: {
      tone: {
        primary: "bg-pine text-paper hover:bg-pine-deep",
        quiet: "border border-line bg-paper text-ink hover:border-brass",
        ghost: "bg-transparent text-ink hover:bg-paper",
      },
    },
    defaultVariants: { tone: "primary" },
  },
);

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonStyles> & { asChild?: boolean };

export function Button({ asChild, tone, className, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={buttonStyles({ tone, className })} {...props} />;
}
