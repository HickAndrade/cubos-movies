import type { Movie } from "../../types/Movie"
import VoteAverage from "./VoteAverage"
import { Link } from "react-router-dom"

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link to={`/movies/${movie.id}`} className="w-full h-full place-items-center">
      <div
        className="
          group
          relative rounded shadow-md overflow-hidden
          aspect-[2/3] w-full max-w-[235px]
          bg-gradient-to-t from-black/50 to-transparent
        "
      >
        <img
          src={movie.coverImageUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
        />

        {movie.voteAverage && (
          <div
            className="
              absolute inset-0 flex items-center justify-center
              opacity-0
              transition-opacity duration-300 ease-out
              group-hover:opacity-100
            "
          >
            <VoteAverage voteAverage={movie.voteAverage} />
          </div>
        )}

        <div className="absolute font-montserrat left-4 right-4 bottom-4 flex flex-col">
          <h3 className="text-white text-sm md:text-base font-semibold">
            {movie.title.toUpperCase()}
          </h3>
          <p
            className="
              text-xs text-zinc-300
              overflow-hidden
              max-h-0
              opacity-0
              transition-[max-height,opacity] duration-300 ease-out
              group-hover:max-h-6
              group-hover:opacity-100
            "
          >
            {movie.genres.join(', ')}
          </p>
        </div>
      </div>
    </Link>
  )
}
