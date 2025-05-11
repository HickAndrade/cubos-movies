import FilterIcon from "../icons/Filter";
import { Button } from "../ui/Button";
import { SearchInput } from "../ui/SearchInput";


interface MovieControlsProps { 
  onAdd: () => void
  onFilter: () => void
  filterText: string
  setFilterText: (term: string) => void
}

export function MovieControls({ onAdd, onFilter, filterText,  setFilterText }: MovieControlsProps) {
  return (
    <div className="flex gap-2  max-sm:flex-col justify-end items-center mb-6">
      <SearchInput
        className="max-w-[488px]"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <div className="flex gap-2 max-sm:w-full">
        <Button variant="secondary" className="max-sm:w-[60%] flex items-center gap-2 justify-center"  onClick={onFilter}>Filtros <FilterIcon className="w-5 h-5" /></Button>
        <Button variant="primary" className="max-sm:w-[90%]" onClick={onAdd}>Adicionar Filme</Button>
      </div>
    </div>
  )
}
