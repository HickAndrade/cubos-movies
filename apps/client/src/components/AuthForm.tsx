import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type FieldValues } from 'react-hook-form'
import type { ZodTypeAny } from 'zod'
import { Input } from './ui/Input'
import { Button } from './ui/Button'
import { Link } from 'react-router-dom'
import { useState } from 'react'

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
    alternateAuthLink?: {
        text: string
        to: string
    }

}


export function AuthForm<T extends FieldValues>({ fields, onSubmit, schema, submitLabel, forgotPasswordLink, alternateAuthLink }: AuthFormProps<T>) {
    const { register, handleSubmit, formState: { errors } } = useForm<T>({ resolver: zodResolver(schema) })
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmitWithLoading(data: T) {
        setIsLoading(true)
        try {
          
            onSubmit(data)
        } finally {
          await new Promise(resolve => setTimeout(resolve, 1500))
          setIsLoading(false)
        }
      }
      

    return (
        <form
            onSubmit={handleSubmit(handleSubmitWithLoading)}
            className='w-full max-w-md transition-colors mx-auto bg-mauve-3 p-4 rounded-sm shadow-md font-
            animate-fade-in-scale
            '>
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

                    {forgotPasswordLink && (
                        <div className="text-right">
                            <a href={forgotPasswordLink} className="text-sm text-primary-purple hover:underline">
                                Esqueci minha senha
                            </a>
                        </div>
                    )}
                    
                    {alternateAuthLink && (
                        <p className="text-center text-sm mt-2">
                            <Link to={alternateAuthLink.to} className="text-primary-purple hover:underline">
                                {alternateAuthLink.text}
                            </Link>
                        </p>
                    )}
                    
                    <Button isLoading={isLoading} variant='primary' type='submit'>{submitLabel}</Button>
                </div>
            </div>
        </form>
    )
}
