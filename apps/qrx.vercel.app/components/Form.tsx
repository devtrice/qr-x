import { yupResolver } from '@hookform/resolvers/yup'
import { HTMLAttributes, ReactNode } from 'react'
import { DefaultValues, FieldValues, FormProvider, Path, UseFormReturn, useForm } from 'react-hook-form'
import { Schema } from 'yup'

type SetError<T> = (name: Path<T>, msg: string) => void

type HTMLFormProps = Omit<HTMLAttributes<HTMLFormElement>, 'children' | 'onSubmit' | 'onError'>

type ChildFunc<TValues extends FieldValues> = (
  arg: Omit<UseFormReturn<TValues>, 'setError'> & { values: TValues; setError: SetError<TValues> },
) => ReactNode

type Props<TValues extends FieldValues> = HTMLFormProps & {
  method?: string
  config?: Request
  schema?: Schema<TValues>
  defaults?: DefaultValues<TValues>
  children?: ReactNode | ChildFunc<TValues>
  onSubmit: (data: TValues, reset?: Function) => void
}

export default function Form<TValues extends FieldValues>({
  method = 'POST',
  config,
  schema,
  defaults,
  children,
  onSubmit,
  ...rest
}: Props<TValues>) {
  const form = useForm<TValues>({
    mode: 'onChange',
    resolver: schema && (yupResolver(schema as never) as never),
    defaultValues: defaults,
    reValidateMode: 'onChange',
  })

  const setError: SetError<TValues> = (name, message) => form.setError(name, { type: 'validate', message })

  return (
    <FormProvider {...form}>
      <form {...rest} onSubmit={form.handleSubmit(data => onSubmit(data, form.reset))}>
        {typeof children === 'function' ? children({ ...form, setError, values: form.watch() }) : children}
      </form>
    </FormProvider>
  )
}
