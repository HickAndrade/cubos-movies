import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
}

const baseStyles = "min-h-[44px] px-[20px] py-[12px] rounded-[2px] text-white text-base font-normal leading-[100%] text-center";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary-purple hover:bg-primary-purple-hover active:bg-primary-purple-active disabled:bg-primary-purple-disabled",
  secondary:
    "bg-secondary-purple hover:bg-secondary-purple-hover active:bg-secondary-purple-active disabled:bg-secondary-purple-disabled",
};

export function Button({
  children,
  variant = "primary",
  className,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={clsx(baseStyles, variants[variant], className)}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
