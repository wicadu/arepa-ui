import React, { Fragment, useMemo } from 'react'

import { Controller } from 'react-hook-form'
import { css, SerializedStyles } from '@emotion/react'

import { getFileSize, getFormFieldsErrors } from '../../../utils'
import Form from '../../hocs/Form'
import InputFileUploader from './Uploader'
import InputFeedback from '../../hocs/InputFeedback'
import Row from '../../layout/Row'
import Button from '../../atoms/Button'

interface Props {
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
  defaultValue,
  doNotShowFeedback,
  doNotShowErrors,
  containerStyles,
  uploaderStyles
}) {
  const { control, formState: { errors } } = Form.useForm()
  const loadedFile: File = Form.useWatch({ name, control })

  const fieldError = getFormFieldsErrors(errors, name)

  const Container = useMemo(() => doNotShowFeedback ? Fragment : InputFeedback, [
    doNotShowFeedback
  ])

  const onPreviewFile = () => {
    window.open(URL.createObjectURL(loadedFile), '_blank')
  }

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
          <Row gap={10}>
            <InputFileUploader
              accept={accept}
              width={width}
              disabled={disabled}
              onChange={(file: File | File[]) => onChange?.(file)}
              styles={uploaderStyles}
              loadedFile={loadedFile}
            />
            {Boolean(loadedFile) && (
              <Button
                type='link'
                align='right'
                children={`${loadedFile?.name?.slice(-17)} - ${getFileSize(loadedFile?.size)}`}
                onClick={onPreviewFile}
                styles={cssPreviewButtonStyles}
              />
            )}
          </Row>
        </Container>
      }
      defaultValue={defaultValue}
    />
  )
}

const cssPreviewButtonStyles = css`
  @media screen and (min-width: 768px) {
    width: 60% !important;
  }

  @media screen and (min-width: 1366px) {
    width: 40%;
  }
`

InputFile.defaultProps = defaultProps

export default InputFile
