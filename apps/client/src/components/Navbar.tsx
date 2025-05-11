import { useTheme } from "../hooks/useTheme"
import { Button } from "./ui/Button"
import { useAuth } from "../context/AuthContext"

import { useEffect, useState } from "react"
import MoviesLogo from "../assets/Movies.svg"
import CubosLogo from "../assets/Cubos.svg"
import OLogo from "../assets/O-Logo.svg"
import SunIcon from "./icons/Sun"
import MoonIcon from "./icons/Moon"

function Navbar() {
  const { toggleTheme, currentTheme } = useTheme()
  const { signOut, isAuth } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])


  return (
    <nav className="w-full h-[72px] px-4 border-b border-[#F1E6FD]/20 bg-gradient-to-b from-black to-transparent backdrop-blur-[2px] flex items-center justify-between z-10 fixed">

      <div className="flex items-center gap-2 max-sm:gap-4">
        <img src={OLogo} alt="Cubos Logo" className="OLogo max-sm:"  />
        <img src={CubosLogo} alt="Cubos Logo" className="OLogo hidden sm:block"  />
        <img src={MoviesLogo} alt="Cubos Logo" className="MoviesLogo"  />
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          onClick={toggleTheme}
        >
          {mounted && currentTheme === 'dark' ? <SunIcon className="" /> : <MoonIcon className=""/>}
        </Button>
        {isAuth && (<Button variant="primary" onClick={signOut}>Logout</Button>)}
      </div>
    </nav>
  )
}

export default Navbar
