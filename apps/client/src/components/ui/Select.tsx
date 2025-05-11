import { forwardRef, type SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, className, children, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full text-theme transition-colors">
        {label && <label className="text-sm font-bold text-theme">{label}</label>}
        <div className="relative">
          <select
            {...props}
            ref={ref}
            className={`
                w-full
              bg-zinc-800 text-white
              px-4 py-2
              rounded border border-zinc-700
              outline-none
              focus:ring-2 focus:ring-purple-600
              appearance-none
              pr-10
              min-h-[44px]
              ${className ?? ''}
            `}
          >
            {children}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
            <svg
              className="w-4 h-4 text-zinc-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    )
  }
)

Select.displayName = 'Select'