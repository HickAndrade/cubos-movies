import MovieList from "../components/movie/MovieList"
import { MovieControls } from "../components/movie/MovieControls"
import { useMovieControls } from "../hooks/useMovieControls"

import CreateMovieDrawer from "../components/movie/CreateMovieDrawer"
import { FilterMovieModal } from "../components/movie/FilterMovieModal"


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
  
    return (
      <div className="py-[88px] w-full sm:px-6 lg:px-8 xl:px-0 max-w-screen-2xl mx-auto">
        <CreateMovieDrawer isOpen={isCreateOpen} onClose={closeCreate} />
        <FilterMovieModal
          isOpen={isFilterOpen}
          onClose={closeFilter}
          onApply={applyFilters}
          initialValues={filters}
        />
  
        <MovieControls
          onAdd={openCreate}
          onFilter={openFilter}
          filterText={filterText}
          setFilterText={setFilterText}
        />
  
        <MovieList filterText={filterText} filters={filters} /> 
      </div>
    )
  }
  

export default MoviesPage
