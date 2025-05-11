import { useState } from "react"
import type { FilterMovieData } from "../schemas/filterMovie.schema"

export function useMovieControls() {
  const [filterText, setFilterText] = useState("")
  const [filters, setFilters] = useState<FilterMovieData>({
    startDate:   undefined,
    endDate:     undefined,
    minDuration: undefined,
    maxDuration: undefined,
    language:    undefined,
  })
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  function openCreate() {
    setIsCreateOpen(true)
  }

  function closeCreate() {
    setIsCreateOpen(false)
  }

  function openFilter() {
    setIsFilterOpen(true)
  }

  function closeFilter() {
    setIsFilterOpen(false)
  }

  function applyFilters(newFilters: FilterMovieData) {
    setFilters(newFilters)
    setIsFilterOpen(false)
  }

  return {
     filterText,
    setFilterText,
    filters,
    applyFilters,
    isCreateOpen,
    openCreate,
    closeCreate,
    isFilterOpen,
    openFilter,
    closeFilter,
  }
}
