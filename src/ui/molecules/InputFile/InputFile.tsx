import React, { Fragment, useMemo } from 'react'

import { Controller } from 'react-hook-form'
import { css, SerializedStyles } from '@emotion/react'

import { getObjectField } from '../../../utils'
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
  doNotShowErrors?: boolean
  label?: string
  width?: string
  accept: string
  containerStyles?: SerializedStyles | string
  uploaderStyles?: SerializedStyles | string
  className?: string
  onChangeInput(f: File | File[]): void
}

const defaultProps: Partial<Props> = {
  defaultValue: '',
  disabled: false,
  width: '100%',
  accept: '.jpg, .jpeg, .png, .svg, .webp, application/pdf',
  className: '',
  onChangeInput() {},
}

function InputFile(props: Props) {
  const {
    name,
    label,
    width,
    accept,
    disabled,
    defaultValue,
    doNotShowFeedback,
    doNotShowErrors,
    containerStyles,
    uploaderStyles,
    className,
    onChangeInput,
  } = {
    ...defaultProps,
    ...props,
  }

  const {
    control,
    formState: { errors },
  } = Form.useForm()
  const loadedFile: File | string = Form.useWatch({ name, control })

  const fieldError = getObjectField(errors, name)

  const Container = useMemo(
    () => (doNotShowFeedback ? Fragment : InputFeedback),
    [doNotShowFeedback]
  )

  const goToPreview = () => {
    if (typeof loadedFile === 'string') {
      window.open(loadedFile, '_blank')
      return
    }

    window.open(URL.createObjectURL(loadedFile), '_blank')
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <Container
          label={label}
          errors={fieldError}
          hasError={Boolean(fieldError?.message)}
          name={name}
          doNotShowErrors={doNotShowErrors}
          className={className}
          styles={containerStyles}
        >
          <Row gap={35}>
            <InputFileUploader
              accept={accept}
              width={width}
              disabled={disabled}
              onChange={(f: File | File[]) => {
                onChange?.(f)
                onChangeInput?.(f)
              }}
              styles={uploaderStyles}
              loadedFile={loadedFile as File}
            />
            {Boolean(loadedFile) && (
              <Button
                type="link"
                align="right"
                children={
                  typeof loadedFile === 'string'
                    ? loadedFile?.slice(-17)
                    : loadedFile?.name?.slice(-17) || ''
                }
                width="auto"
                onClick={goToPreview}
                styles={cssPreviewButtonStyles}
              />
            )}
          </Row>
        </Container>
      )}
      defaultValue={defaultValue}
    />
  )
}

const cssPreviewButtonStyles = css`
  min-width: 105px;

  @media screen and (min-width: 768px) {
    width: 60% !important;
  }

  @media screen and (min-width: 1366px) {
    width: 40%;
  }
`

export default InputFile
