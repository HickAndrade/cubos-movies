import { useEffect, useState } from "react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Drawer({ isOpen, onClose, children }: DrawerProps) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [animation, setAnimation] = useState("");

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setAnimation("animate-slide-in-right");
    } else {
      setAnimation("animate-slide-out-right");
      const timeout = setTimeout(() => {
        setShouldRender(false);
      }, 300); 

      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex justify-end"
      onClick={onClose}
    >
      <div
        className={`bg-mauve-3 w-full max-w-md h-full p-6 overflow-y-auto shadow-xl ${animation}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
