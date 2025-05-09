import { useTheme } from "../hooks/useTheme"
import { Button } from "./ui/Button"
import { useAuth } from "../context/AuthContext"

import { useEffect, useState } from "react"
import CubosLogo from "../assets/CubosLogo.svg"

function Navbar() {
  const { toggleTheme, currentTheme } = useTheme()
  const { signOut } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])


  return (
    <nav className="w-full h-[72px] px-4 border-b border-[#F1E6FD]/20 bg-gradient-to-b from-black to-transparent backdrop-blur-[2px] flex items-center justify-between z-10 fixed">

      <div className="flex items-center gap-2">
        <img src={CubosLogo} alt="Cubos Logo"  />
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          onClick={toggleTheme}
        >
          {mounted && currentTheme === 'dark' ? 'moon' : 'sun'}
        </Button>
        <Button variant="primary" onClick={signOut}>Logout</Button>
      </div>
    </nav>
  )
}

export default Navbar
