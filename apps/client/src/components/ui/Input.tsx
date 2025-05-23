import { type InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full text-theme transition-colors">
        {label && <label className="text-sm font-bold text-theme">{label}</label>}
        <input
          ref={ref}
          {...props}
          className={`
            dark:bg-mauve-dark-2 dark:text-[#EEEEF0] caret-purple-9 text-black px-4 py-2 rounded border border-zinc-700 outline-none
            focus:ring-2 focus:ring-purple-9 
            min-h-[44px]
            ${className}
          `}
        />
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    )
  }
)

Input.displayName = 'Input'
