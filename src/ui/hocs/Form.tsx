import React from 'react'
import {
  useForm,
  useWatch,
  FormProvider,
  useFormState,
  useFormContext,
  useFieldArray,
} from 'react-hook-form'
import PropTypes, { InferProps } from 'prop-types'

const propTypes = {
  children: PropTypes.node.isRequired,
  opts: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
}

type Props = InferProps<typeof propTypes>

const defaultProps: Props = {
  opts: {},
  onSubmit() {},
}

function Form({ children, opts, onSubmit }: Props) {
  const methods = useForm<any>(opts)

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  )
}

Form.propTypes = propTypes
Form.defaultProps = defaultProps

Form.useForm = useFormContext
Form.useWatch = useWatch
Form.useFieldArray = useFieldArray
Form.useFormState = useFormState

export default Form
