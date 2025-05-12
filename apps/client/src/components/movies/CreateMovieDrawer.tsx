
import { useState } from "react";
import type { RawMovieFormData } from "../../schemas/createMovie.schema";
import { movieService } from "../../services/movieService";
import { Drawer } from "../ui/Drawer"
import MovieForm from "./MovieForm"
import CloseIcon from "../icons/Close";

interface CreateMovieDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
}

function CreateMovieDrawer({ isOpen, onClose, onCreated }: CreateMovieDrawerProps) {
  const [loading, setLoading] = useState(false)

  async function handleCreate(data: RawMovieFormData) {
    try {
      
      setLoading(true)
      
      await movieService.create(data);
      onCreated()
      onClose()
    } catch (err) {
      console.error("Erro ao criar filme", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-theme text-2xl font-bold">Adicionar Filme</h2>
        <button
          className="text-zinc-400 hover:text-white transition-colors"
          onClick={onClose}
        >
          <CloseIcon />
        </button>
      </div>
      <MovieForm
        onSubmit={handleCreate}
        onCancel={onClose}
        isLoading={loading}
      />
    </Drawer>
  )
}


export default CreateMovieDrawer