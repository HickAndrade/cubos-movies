import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type FieldValues } from 'react-hook-form'
import type { ZodTypeAny } from 'zod'
import { Input } from './ui/Input'
import { Button } from './ui/Button'

interface Field {
    name: string
    type: string
    placeholder: string
    label: string
  }

interface AuthFormProps<T> {
    schema: ZodTypeAny
    fields: Field[]
    onSubmit: (data: T) => void;
    submitLabel: string;
    forgotPasswordLink?: string;
}


export function AuthForm<T extends FieldValues>({ fields, onSubmit, schema, submitLabel, forgotPasswordLink }: AuthFormProps<T>) {
    const { register, handleSubmit, formState: { errors }} = useForm<T>({ resolver: zodResolver(schema) })
    
      return (
        <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full max-w-md transition-colors mx-auto bg-mauve-3 p-4 rounded-sm shadow-md font-roboto'>
        <div className='flex flex-col gap-4'>
            {fields.map((field) => (
                <div key={field.name} className='flex flex-col'>
                    <Input
                        key={field.name}
                        label={field.label}
                        type={field.type}
                        placeholder={field.placeholder}
                        error={errors[field.name as keyof typeof errors]?.message as string}
                        {...register(field.name as any)} />
                </div> 
                ))}
                <div className='flex justify-between items-center'>
                <a href={forgotPasswordLink} className="text-sm text-primary-purple hover:underline text-right">
                    Esqueci minha senha
                </a>
                <Button variant='primary' type='submit' onClick={() => submitLabel}>Entrar</Button>
                </div>
            </div>
        </form>
      )
}
