import { type InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        {label && <label className="text-sm font-bold text-white">{label}</label>}
        <input
          ref={ref}
          {...props}
          className={`
            bg-zinc-800 text-white px-4 py-2 rounded border border-zinc-700 outline-none
            focus:ring-2 focus:ring-purple-600
            ${className}
          `}
        />
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    )
  }
)

Input.displayName = 'Input'
