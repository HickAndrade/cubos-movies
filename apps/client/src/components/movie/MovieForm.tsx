import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { Controller, useForm, type Resolver } from "react-hook-form"
import { createMovieSchema, type CreateMovieData, type RawMovieFormData } from "../../schemas/createMovie.schema"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"

interface MovieFormProps {
  onSubmit: (data: RawMovieFormData) => void
  onCancel: () => void
  initialData?: Partial<CreateMovieData & { id: number }>
  isEdit?: boolean
}

function MovieForm({ onSubmit, onCancel, initialData, isEdit = false }: MovieFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RawMovieFormData>({
    resolver: zodResolver(createMovieSchema) as unknown as Resolver<RawMovieFormData>,
    defaultValues: initialData
      ? {
          ...initialData,
          genres: initialData.genres?.join(", ") || "",
        }
      : undefined,
  })
 

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        genres: initialData.genres?.join(", ") || "",
      })
    }
  }, [initialData, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input label="Título" {...register("title")} error={errors.title?.message} />
      <Input label="Título Original" {...register("originalTitle")} error={errors.originalTitle?.message} />
      <Input label="Descrição" {...register("description")} error={errors.description?.message} />
      <Input label="Tagline" {...register("tagline")} error={errors.tagline?.message} />
      <Input label="Popularidade" type="number" {...register("popularity")} error={errors.popularity?.message} />
      <Input label="Votos" type="number" {...register("voteCount")} error={errors.voteCount?.message} />
      <Input label="Data de Lançamento" type="date" {...register("releaseDate")} error={errors.releaseDate?.message} />
      <Input label="Duração (minutos)" type="number" {...register("duration")} error={errors.duration?.message} />
      <Input label="Idioma" {...register("language")} error={errors.language?.message} />
      <Input label="Status" {...register("status")} error={errors.status?.message} />
      <Input label="Gêneros (separados por vírgula)" {...register("genres")} error={errors.genres?.message} />
      <Input label="Orçamento" type="number" {...register("budget")} error={errors.budget?.message} />
      <Input label="Receita" type="number" {...register("revenue")} error={errors.revenue?.message} />
      <Controller
          control={control}
          name="coverImageFile"
          rules={{ required: "É preciso escolher uma imagem" }}
          render={({ field }) => (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => field.onChange(e.target.files)}
            />
          )}
        />
        {errors.coverImageFile?.message && (
          <p className="text-sm text-red-500">
            {errors.coverImageFile.message as string}
          </p>
        )}
      <Input label="Trailer (URL)" {...register("trailerUrl")} error={errors.trailerUrl?.message} />

      <div className="flex justify-end gap-4 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          {isEdit ? "Salvar Alterações" : "Adicionar Filme"}
        </Button>
      </div>
    </form>
  )
}

export default MovieForm
