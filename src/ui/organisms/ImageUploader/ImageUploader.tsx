import React, { useCallback, useRef, useMemo, useEffect } from 'react'

import styled from '@emotion/styled'
import { Size } from 'react-easy-crop'

import Form from '../../hocs/Form'
import Alert from '../../molecules/Alert'
import { UIElementStatusEnum, UIElementShapeEnum } from '../../ts'
import ImageInput from './ImageInput'
import ImageDisplay from './ImageDisplay'
import ImageCropper from './ImageCropper'

type Labels = {
  loadInputText: string
  loadButtonText: string
  saveCropButtonText: string
  cancelCropButtonText: string
}

interface Props {
  name: string
  shape: UIElementShapeEnum
  labels: Labels
  size: Size
  defaultImage?: string
  onSubmit?: () => void
  loadingOnSubmit?: boolean
  onDelete?: () => void
  loadingOnDelete?: boolean
  helperTexts?: string[]
  hidden?: boolean
}

const defaultProps: Partial<Props> = {
  name: '',
  shape: UIElementShapeEnum.Rect,
  labels: {
    loadInputText: '',
    loadButtonText: '',
    saveCropButtonText: '',
    cancelCropButtonText: '',
  },
  size: {
    width: 275,
    height: 275
  },
  defaultImage: '',
  onSubmit() { },
  loadingOnSubmit: false,
  onDelete() { },
  loadingOnDelete: false,
  helperTexts: [],
  hidden: false
}

function ImageUploader(props: Props) {
  const {
    name,
    shape,
    labels,
    defaultImage,
    size,
    onSubmit,
    loadingOnSubmit,
    onDelete,
    loadingOnDelete,
    helperTexts,
  } = {
    ...defaultProps,
    ...props
  }

  const { formState: { errors }, setValue, reset, watch } = Form.useForm()

  const hiddenInputRef = useRef<HTMLInputElement | null>(null)

  const handleOnCancel = useCallback(() => {
    setValue(name, defaultImage || '')
    setValue('editing', false)
    if (hiddenInputRef?.current) hiddenInputRef.current.value = '';
  }, [
    name,
    hiddenInputRef,
    defaultImage
  ])

  const handleOnLoad = useCallback(() => hiddenInputRef?.current?.click(), [
    hiddenInputRef
  ])

  const handleOnChangeImage = useCallback((event) => {
    const { files } = event?.target || {}

    if (files?.[0]) {
      setValue(name, files)
      setValue('editing', true)
    }
  }, [
    setValue,
    name
  ])

  const isEditing: boolean = useMemo(() => watch('editing'), [
    watch('editing')
  ])

  const hasError: boolean = useMemo(() => Boolean(errors?.[name]?.message), [
    errors?.[name]
  ])

  useEffect(() => {
    return () => {
      reset()
      if (hiddenInputRef?.current) hiddenInputRef.current.value = '';
    }
  }, [
    defaultImage,
    name,
  ])

  return (
    <Container>
      <CustomDashedBorder
        size={size}
        hidden={Boolean(defaultImage && !isEditing)}
      >
        <svg viewBox='0 0 100 100'>
          {shape === UIElementShapeEnum.Round ? (
            <circle
              cx='50'
              cy='50'
              r='50'
              stroke='white'
              strokeWidth='1'
              fill='none'
              strokeDasharray='5'
            />
          ) : (
            <rect
              x='0'
              y='0'
              width='100'
              height='100'
              rx='3'
              ry='3'
              stroke='white'
              strokeWidth='1'
              fill='none'
              strokeDasharray='5'
              strokeDashoffset='3'
            />
          )}
        </svg>
      </CustomDashedBorder>

      {defaultImage && !isEditing ? (
        <ImageDisplay
          image={defaultImage}
          shape={shape}
          size={size}
          loading={loadingOnDelete}
          helperTexts={helperTexts}
          onDelete={onDelete}
          onLoad={handleOnLoad}
          buttonText={labels?.loadButtonText}
        />
      ) : isEditing ? (
        <ImageCropper
          name={name}
          shape={shape}
          size={size}
          nextButtonText={labels?.saveCropButtonText}
          cancelButtonText={labels?.cancelCropButtonText}
          loading={loadingOnSubmit}
          handleSubmit={onSubmit}
          handleOnCancel={handleOnCancel}
        />
      ) : (
        <ImageInput
          size={size}
          shape={shape}
          inputLabel={labels.loadInputText}
          helperTexts={helperTexts}
          onLoad={handleOnLoad}
        />
      )}

      <Alert
        show={hasError}
        type={UIElementStatusEnum.Error}
        title={errors?.[name]?.type as string}
        description={errors?.[name]?.message as string}
      />

      <HiddenInputFilePicker
        type='file'
        name={name}
        accept='image/*'
        capture='environment'
        onChange={handleOnChangeImage}
        ref={hiddenInputRef}
      />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`

const CustomDashedBorder = styled.div<{
  size: Size
  hidden: boolean
}>`
  pointer-events: none;
  border-radius: 50%;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 1;

  svg {
    width: 100%;
    height: 100%;
    transform: rotate(90deg);
  }

  ${({ size, hidden }) => `
    width: ${size.width}px;
    height: ${size.height}px;

    opacity: ${hidden ? 0 : 1};
  `}
`

const HiddenInputFilePicker = styled.input`
  display: none;
`

ImageUploader.defaultProps = defaultProps

export default ImageUploader
