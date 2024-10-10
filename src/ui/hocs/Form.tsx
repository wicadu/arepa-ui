import React from 'react'
import {
  useForm,
  useWatch,
  FormProvider,
  useFormState,
  useFormContext,
  useFieldArray,
} from 'react-hook-form'

interface Props {
  children: React.ReactNode;
  opts?: Record<string, unknown>
  onSubmit: () => void
}

const defaultProps: Partial<Props> = {
  opts: {},
  onSubmit() { },
}

function Form(props: Props) {
  const { children, opts, onSubmit } = {
    ...defaultProps,
    ...props
  }

  const methods = useForm<any>(opts)

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  )
}

Form.useForm = useFormContext
Form.useWatch = useWatch
Form.useFieldArray = useFieldArray
Form.useFormState = useFormState

export default Form
