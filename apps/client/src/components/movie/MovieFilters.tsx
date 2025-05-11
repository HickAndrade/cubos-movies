import { useFormContext, Controller } from "react-hook-form"
import { Input } from "../ui/Input"
import type { FilterMovieData } from "../../schemas/filterMovie.schema"
import { Select } from "../ui/Select"
import { useLanguages } from "../../hooks/useLanguages"
import { useGenres } from "../../hooks/useGenres"

export function MovieFilters() {
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<FilterMovieData>()

  const languages = useLanguages();
  const genres = useGenres();

  return (
    <div className="space-y-4">
      <Input label="Data Inicial" type="date" {...register("startDate")} error={errors.startDate?.message} />
      <Input label="Data Final" type="date" {...register("endDate")} error={errors.endDate?.message} />
      <Input label="Duração mínima (min)" type="number" {...register("minDuration")} error={errors.minDuration?.message} />
      <Input label="Duração máxima (min)" type="number" {...register("maxDuration")} error={errors.maxDuration?.message} />

      <Controller
        name="language"
        control={control}
        render={({ field }) => (
          <Select label="Idioma" {...field} error={errors.language?.message}>
            <option value="">Todos</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </Select>
        )}
      />

      <Controller
        name="genres"
        control={control}
        render={({ field }) => (
          <Select label="Gênero" {...field} error={errors.genres?.message}>
            <option value="">Todos</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </Select>
        )}
      />
    </div>
  )
}
