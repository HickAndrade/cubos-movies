import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { filterMovieSchema, type FilterMovieData } from "../../schemas/filterMovie.schema"
import { Modal } from "../ui/Modal"
import { Button } from "../ui/Button"
import { useEffect } from "react"
import { MovieFilters } from "./MovieFilters"

interface FilterMovieModalProps {
  isOpen: boolean
  onClose: () => void
  onApply: (filters: FilterMovieData) => void
  initialValues?: FilterMovieData
}

export function FilterMovieModal({
  isOpen,
  onClose,
  onApply,
  initialValues
}: FilterMovieModalProps) {
  const methods = useForm<FilterMovieData>({
    resolver: zodResolver(filterMovieSchema),
    defaultValues: initialValues ?? {},
  })
  const { handleSubmit, reset, getValues } = methods

  useEffect(() => {
    if (isOpen && initialValues) {
      reset(initialValues)
    }
  }, [isOpen, initialValues, reset])

  function onSubmit(data: FilterMovieData) {
    onApply(data)
  }

  function handleClose() {
    onApply(getValues())
    onClose()
  }

  function onClear() {
    reset({})
    onApply({})
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Filtros Avançados">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <MovieFilters />
          <div className="flex justify-end gap-4 pt-2">
            <Button type="button" variant="secondary" onClick={onClear}>
              Limpar
            </Button>
            <Button type="submit" variant="primary">
              Aplicar Filtros
            </Button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  )
}
