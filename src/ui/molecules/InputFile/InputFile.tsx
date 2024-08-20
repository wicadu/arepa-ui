import React, { Fragment, useMemo, useState } from 'react'

import { Controller } from 'react-hook-form'
import { SerializedStyles } from '@emotion/react'

import { getFormFieldsErrors } from '../../../utils'
import Form from '../../hocs/Form'
import InputFileUploader from './Uploader'
import FilesSummary from './FilesSummary'
import InputFeedback from '../../hocs/InputFeedback'

interface Props {
  component?: React.ReactNode,
  name: string
  disabled?: boolean
  defaultValue?: string | number
  doNotShowFeedback?: boolean
  label?: string
  width?: string
  accept: string
  containerStyles?: SerializedStyles | string
  uploaderStyles?: SerializedStyles | string
}

const defaultProps: Partial<Props> = {
  defaultValue: '',
  disabled: false,
  width: '100%',
  accept: '.jpg, .jpeg, .png, .svg, .webp, application/pdf'
}

function InputFile({
  name,
  label,
  width,
  accept,
  disabled,
  component,
  defaultValue,
  doNotShowFeedback,
  doNotShowErrors,
  containerStyles,
  uploaderStyles
}) {
  const [loadedFile, setLoadedFile] = useState<File | File[]>(null)

  const { control, formState: { errors } } = Form.useForm()

  const fieldError = getFormFieldsErrors(errors, name)

  const Container = useMemo(() => doNotShowFeedback ? Fragment : InputFeedback, [
    doNotShowFeedback
  ])

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) =>
        <Container
          label={label}
          errors={fieldError}
          hasError={Boolean(fieldError?.message)}
          name={name}
          doNotShowErrors={doNotShowErrors}
          styles={containerStyles}
        >
          {loadedFile ? (
            <FilesSummary
              file={loadedFile}
              clearFile={() => {
                onChange?.(null)
                setLoadedFile(null)
              }}
            />
          ) : (
            <InputFileUploader
              accept={accept}
              width={width}
              disabled={disabled}
              component={component}
              onChange={(file: File | File[]) => {
                onChange?.(file)
                setLoadedFile(file)
              }}
              styles={uploaderStyles}
            />
          )}
        </Container>
      }
      defaultValue={defaultValue}
    />
  )
}

InputFile.defaultProps = defaultProps

export default InputFile
