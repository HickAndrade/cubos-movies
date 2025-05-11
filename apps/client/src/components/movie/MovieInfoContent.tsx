import { Button } from "../ui/Button"
import type { Movie } from "../../types/Movie"
import VoteAverage from "../movies/VoteAverage"
import { MovieStat } from "./MovieStat"
import { InfoBlock } from "./InfoBlock"
import { BackButton } from "../ui/BackButton"

interface Props {
  movie: Movie
  onEdit: () => void
  onDelete: () => void
}

export function MovieInfoContent({ movie, onEdit, onDelete }: Props) {
  const stats = [
    { label: "Lançamento", value: movie.releaseDate },
    { label: "Duração", value: `${movie.duration}m` },
    { label: "Situação", value: movie.status },
    { label: "Idioma", value: movie.language },
    { label: "Orçamento", value: `$${movie.budget}M` },
    { label: "Receita", value: `$${movie.revenue}M` },
    { label: "Lucro", value: `$${(movie.revenue - movie.budget).toFixed(2)}M` }
  ]
  const firstFour = stats.slice(0, 4)
  const lastThree = stats.slice(4)

  function getYoutubeId(url: string): string | null {
    const re = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/
    const m = url.match(re)
    return m ? m[1] : null
  }

  const videoId = movie.trailerUrl ? getYoutubeId(movie.trailerUrl) : null

  return (
    <div className="my-[88px] py-[40px] w-full sm:px-6 lg:px-8 max-w-screen-2xl mx-auto">
        <BackButton />
    <div className="grid grid-cols-1 lg:grid-cols-[374px_minmax(0,1fr)] gap-6 items-start">
      
      <img
        src={movie.coverImageUrl}
        alt={movie.title}
        className="w-full mx-auto max-w-[374px] h-auto object-cover rounded order-1"
      />
  
      <div className="order-2 lg:col-span-full lg:order-none flex  justify-between mb-4 items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-black dark:text-theme">{movie.title}</h1>
          <p className="text-base italic text-black dark:text-theme">Título original: {movie.originalTitle}</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="secondary" className="w-full sm:w-auto" onClick={onDelete}>Deletar</Button>
          <Button variant="primary" className="w-full sm:w-auto" onClick={onEdit}>Editar</Button>
        </div>
      </div>
  
      <div className="order-3 flex flex-col gap-6">
        <div className="flex flex-wrap flex-col-reverse sm:flex-row justify-between items-center gap-4">
          {movie.tagline && <p className="italic text-gray-300">{movie.tagline}</p>}
          <div className="flex items-center gap-4">
            <MovieStat label="Popularidade" value={movie.popularity} />
            <MovieStat label="Votos" value={movie.voteCount} />
            {movie.voteAverage && <VoteAverage customClass="shrink-0" voteAverage={movie.voteAverage} />}
          </div>
        </div>
  
        <div className="flex flex-col sm:flex-row">
          <div className="flex flex-col sm:mr-6 mb-4 gap-y-4 sm:basis-[419px] shrink ">
            <InfoBlock title="SINOPSE">
              <p className="text-base leading-relaxed">{movie.description}</p>
            </InfoBlock>
            <InfoBlock title="Gêneros">
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span key={genre} className="bg-[#C150FF2E]  text-xs px-2 py-1 rounded-[2px]">
                    {genre.toUpperCase()}
                  </span>
                ))}
              </div>
            </InfoBlock>
          </div>
  
          <div className="ml-auto space-y-4 flex flex-col">
            <div className="grid grid-cols-2 gap-4">
              {firstFour.map((s) => <MovieStat key={s.label} label={s.label} value={s.value} />)}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {lastThree.map((s) => <MovieStat key={s.label} label={s.label} value={s.value} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <div className="mt-8">
      <h2 className="text-2xl font-semibold text-theme mb-4">Trailer</h2>
      {videoId ? (
        <div className="relative w-full pb-[56.25%]">
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="Trailer"
            allowFullScreen
          />
        </div>
      ) : (
        <p className="text-sm text-zinc-400">Nenhum trailer disponível.</p>
      )}
    </div>
  </div>
  )
}
