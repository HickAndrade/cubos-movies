import type { ReactNode } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary";

interface FileInputButtonProps {
    id: string;
    onChange: (files: FileList | null) => void;
    children: ReactNode;
    fileName?: string;
    variant?: Variant;
    disabled?: boolean;
  }
  

const baseStyles = `
  cursor-pointer inline-block
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

export function FileInputButton({
  id,
  onChange,
  children,
  variant = "primary",
  disabled = false,
  fileName
}: FileInputButtonProps) {
  return (
    <div className="inline-block">
    <label
      htmlFor={id}
      className={clsx(
        baseStyles,
        variants[variant],
        disabled && "cursor-not-allowed opacity-60"
      )}
    >
      {children}
    </label>
    <input
      id={id}
      type="file"
      accept="image/*"
      className="hidden"
      onChange={(e) => onChange(e.target.files)}
      disabled={disabled}
    />
    {fileName && (
      <p className="mt-2 text-sm text-white truncate max-w-xs">{fileName}</p>
    )}
  </div>
  
  );
}
