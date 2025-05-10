
import { Drawer } from "../Drawer"
import MovieForm from "./MovieForm"


function CreateMovieModal({ isOpen, onClose }: {
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-2xl font-bold">Adicionar Filme</h2>
        <button
          className="text-zinc-400 hover:text-white transition-colors"
          onClick={onClose}
        >
          ×
        </button>
      </div>
      <MovieForm onSuccess={()=> {}} />
    </Drawer>
  )
}


export default CreateMovieModal