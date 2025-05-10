import { Button } from "../ui/Button";
import { SearchInput } from "../ui/SearchInput";


export function MovieControls({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex  gap-2 justify-end items-center mb-6">
     <SearchInput className="max-w-[488px]" />
      <div className="flex gap-2">
        <Button variant="secondary">Filtros</Button>
        <Button variant="primary" onClick={onAdd}>Adicionar Filme</Button>
      </div>
    </div>
  )
}