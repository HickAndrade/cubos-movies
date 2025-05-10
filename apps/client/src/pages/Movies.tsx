import MovieList from "../components/movie/MovieList"
import { MovieControls } from "../components/movie/MovieControls"
import { useState } from "react"
import CreateMovieModal from "../components/movie/CreateMovieModal"


function MoviesPage() {
    const [isCreateOpen, setIsCreateOpen] = useState(false)


  return (
<div className=" pt-[88px] w-full px-4 sm:px-6 lg:px-8 xl:px-0 max-w-screen-2xl mx-auto">
        <MovieControls onAdd={() => setIsCreateOpen(true)} />
        
      <MovieList />

      {isCreateOpen && (
        
        <CreateMovieModal
            isOpen={isCreateOpen}
            onClose={() => setIsCreateOpen(false)}
      />
      )}
    </div>
  )
}

export default MoviesPage
