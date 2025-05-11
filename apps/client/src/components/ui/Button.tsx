import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  isLoading?: boolean;
}

const baseStyles = `
  min-h-[44px] px-[20px] py-[12px] rounded-[2px]
  text-white text-base font-normal leading-[100%] text-center
  transition-colors duration-200 ease-in-out
`;

const variants: Record<Variant, string> = {
    primary: `
    bg-primary-purple
    hover:bg-primary-purple-hover
    active:bg-primary-purple-active
    disabled:bg-primary-purple-disabled
  `,
  secondary: `
    bg-secondary-purple
    hover:bg-secondary-purple-hover
    active:bg-secondary-purple-active
    disabled:bg-secondary-purple-disabled
  `,
};

export function Button({
  children,
  variant = "primary",
  className,
  disabled,
  isLoading,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={clsx(baseStyles, variants[variant], className)}
      disabled={disabled}
      {...rest}
    >
    {isLoading ? (
        <svg
          className="w-5 h-5 mx-auto"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
        >
          <circle fill="#FFFFFF" stroke="#FFffff" strokeWidth="15" r="15" cx="40" cy="100">
            <animate attributeName="opacity" calcMode="spline" dur="2s" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4s" />
          </circle>
          <circle fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="15" r="15" cx="100" cy="100">
            <animate attributeName="opacity" calcMode="spline" dur="2s" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2s" />
          </circle>
          <circle fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="15" r="15" cx="160" cy="100">
            <animate attributeName="opacity" calcMode="spline" dur="2s" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0s" />
          </circle>
        </svg>
      ) : (
        children
      )}
    </button>
  );
}
