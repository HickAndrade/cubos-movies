import { useEffect, useState } from "react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const [shouldRender, setShouldRender] = useState(isOpen)
  const [animation, setAnimation] = useState("")

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      setAnimation("animate-fade-in-scale")
    } else {
      setAnimation("animate-fade-out-scale")
      const timeout = setTimeout(() => setShouldRender(false), 300)
      return () => clearTimeout(timeout)
    }
  }, [isOpen])

  if (!shouldRender) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className={`bg-zinc-900 p-6 rounded-xl shadow-md w-full max-w-lg ${animation}`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h2 className="text-theme text-2xl mb-4 font-bold">{title}</h2>}
        {children}
      </div>
    </div>
  )
}
