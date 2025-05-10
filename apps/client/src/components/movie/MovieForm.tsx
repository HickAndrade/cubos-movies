import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { createMovieSchema, type CreateMovieData } from "../../schemas/createMovie.schema"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { movieService } from "../../services/movieService"

interface MovieFormProps {
    onSuccess: () => void;
    onCancel: () => void;

}

function MovieForm({ onSuccess, onCancel  }:MovieFormProps){
    const [loading, setLoading] = useState(false)
    const {
      register,
      handleSubmit,
      formState: { errors }
    } = useForm<CreateMovieData>({
      resolver: zodResolver(createMovieSchema)
    })

    async function onSubmit(data: CreateMovieData) {
        try {
          setLoading(true)
          await movieService.create(data)
          onSuccess()
        } catch (err) {
          console.error("Erro ao criar filme", err)
        } finally {
          setLoading(false)
        }
      }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input label="Título" {...register("title")} error={errors.title?.message} />
            <Input label="Título Original" {...register("originalTitle")} error={errors.originalTitle?.message} />
            <Input label="Descrição" {...register("description")} error={errors.description?.message} />
            <Input label="Data de Lançamento" type="date" {...register("releaseDate")} error={errors.releaseDate?.message} />
            <Input label="Duração (minutos)" type="number" {...register("duration")} error={errors.duration?.message} />
            <Input label="Idioma" {...register("language")} error={errors.language?.message} />
            <Input label="Status" {...register("status")} error={errors.status?.message} />
            <Input label="Gêneros (separados por vírgula)" {...register("genres")} error={errors.genres?.message} />
            <Input label="Orçamento" type="number" {...register("budget")} error={errors.budget?.message} />
            <Input label="Receita" type="number" {...register("revenue")} error={errors.revenue?.message} />
            <Input label="Capa (URL)" {...register("coverImageUrl")} error={errors.coverImageUrl?.message} />
            <Input label="Trailer (URL)" {...register("trailerUrl")} error={errors.trailerUrl?.message} />
            <div className="flex justify-end gap-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Salvando..." : "Adicionar Filme"}
        </Button>
      </div>
    </form>
    )
}

export default MovieForm