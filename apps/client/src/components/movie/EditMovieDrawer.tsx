
import { useState } from "react";

import { movieService } from "../../services/movieService";
import { Drawer } from "../ui/Drawer"

import CloseIcon from "../icons/Close";
import type { RawMovieFormData } from "../../schemas/createMovie.schema";
import MovieForm from "../movies/MovieForm";
import type { Movie } from "../../types/Movie";

interface EditMovieDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdated: () => void;
  initialValues: Movie;
  id: string;
}

function EditMovieDrawer({ isOpen, onClose, initialValues, onUpdated, id }: EditMovieDrawerProps) {
  const [loading, setLoading] = useState(false)

  async function handleEdit(data: RawMovieFormData) {
    try {
      setLoading(true)
      await movieService.update(Number(id), data);
    
      onUpdated()
    } catch (err) {
      console.error("Erro ao editar filme", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-theme text-2xl font-bold">Editar Filme</h2>
        <button
          className="text-zinc-400 hover:text-white transition-colors"
          onClick={onClose}
        >
          <CloseIcon />
        </button>
      </div>
      <MovieForm
        initialData={initialValues}
        onSubmit={handleEdit}
        onCancel={onClose}
        isEdit
        isLoading={loading}
      />
    </Drawer>
  )
}


export default EditMovieDrawer