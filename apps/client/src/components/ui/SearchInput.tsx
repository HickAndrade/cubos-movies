import { type InputHTMLAttributes, forwardRef } from 'react'

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className={`
        flex items-center gap-2
        px-3
        border border-zinc-700 rounded
        min-h-[44px]
        w-full
        text-sm
        bg-zinc-800
        text-white
        ${className}
      `}>
        
        <input
          ref={ref}
          {...props}
          className="bg-transparent font-roboto outline-none w-full placeholder:text-zinc-400"
          placeholder="Pesquise por filmes"
        />
        
      </div>
    )
  }
)

SearchInput.displayName = 'SearchInput'
