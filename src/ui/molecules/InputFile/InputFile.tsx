import React, { useState } from 'react'

import { Controller } from 'react-hook-form'

import Form from '../../hocs/Form'
import InputFileUploader from './Uploader'
import FilesSummary from './FilesSummary'

interface Props {
  component?: React.ReactNode,
  name: string
  disabled?: boolean
  defaultValue?: string | number
  doNotShowFeedback?: boolean
  label?: string
  width?: string
}

const defaultProps: Partial<Props> = {
  defaultValue: '',
  disabled: false,
  width: '220px'
}

function InputFile({
  component,
  name,
  disabled,
  defaultValue,
  label,
  width,
  doNotShowFeedback
}): JSX.Element {
  const [loadedFile, setLoadedFile] = useState<File | File[]>(null)

  const { control } = Form.useForm()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => loadedFile ? (
        <FilesSummary
          clearFile={() => {
            onChange?.(null)
            setLoadedFile(null)
          }}
          file={loadedFile}
        />
      ) : (
        <InputFileUploader
          label={label}
          name={name}
          component={component}
          disabled={disabled}
          onChange={(file: File | File[]) => {
            onChange?.(file)
            setLoadedFile(file)
          }}
          width={width}
          doNotShowFeedback={doNotShowFeedback}
        />
      )}
      defaultValue={defaultValue}
    />
  )
}

InputFile.defaultProps = defaultProps

export default InputFile
