import MovieList from "../components/movies/MovieList"
import { MovieControls } from "../components/movies/MovieControls"
import { useMovieControls } from "../hooks/useMovieControls"

import CreateMovieDrawer from "../components/movies/CreateMovieDrawer"
import { FilterMovieModal } from "../components/movies/FilterMovieModal"
import { useRef } from "react"
import type { MovieListRef } from "../types/Movie"


function MoviesPage() {
    const {
     applyFilters,
     closeCreate,
     closeFilter,
     filterText,
     filters,
     isCreateOpen,
     isFilterOpen,
     openCreate,
     openFilter,
     setFilterText
    } = useMovieControls()
  
    const movieListRef = useRef<MovieListRef>(null)


    return (
      <div className="py-[88px] w-full sm:px-6 lg:px-8 xl:px-0 max-w-screen-2xl mx-auto">
        <CreateMovieDrawer 
          isOpen={isCreateOpen} 
          onClose={closeCreate}
          onCreated={() => movieListRef.current?.refetch()}
          />
        <FilterMovieModal
          isOpen={isFilterOpen}
          onClose={closeFilter}
          onApply={(filters) => {
            applyFilters(filters)
            movieListRef.current?.refetch()
          }}
  
          initialValues={filters}
        />
  
        <MovieControls
          onAdd={openCreate}
          onFilter={openFilter}
          filterText={filterText}
          setFilterText={setFilterText}
        />
  
        <MovieList ref={movieListRef} filterText={filterText} filters={filters} /> 
      </div>
    )
  }
  

export default MoviesPage
