
import { useNavigate } from "react-router-dom"
import { Button } from "../ui/Button"
import { Modal } from "../ui/Modal"
import { movieService } from "../../services/movieService"

interface DeleteMovieModal {
  isOpen: boolean
  onClose: () => void
  id: string;
}

export function DeleteMovieModal({isOpen, onClose, id }: DeleteMovieModal) {
    const navigate = useNavigate()

    const handleDelete = async () => {
        await movieService.delete(Number(id))
        navigate("/movies")
    } 
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Filtros Avançados">
        <div className="flex gap-y-4 flex-col">   
            <p className="text-theme">Tem certeza que deseja deletar esse filme?</p>
            <div className="w-full items-end justify-end flex gap-x-2">
            <Button type="button" variant="secondary" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="button"  className="bg-red-300" onClick={handleDelete}>
                Deletar
              </Button>
            </div>
        </div>
        
    </Modal>
  )
}
