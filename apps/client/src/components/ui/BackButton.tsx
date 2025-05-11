import { useNavigate } from "react-router-dom"
import LeftArrowIcon from "../icons/LeftArrow"


export function BackButton() {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 font-bold text-theme hover:underline mb-1 cursor-pointer"
    >
      <LeftArrowIcon className="text-theme" />
      <span>Voltar</span>
    </button>
  )
}
