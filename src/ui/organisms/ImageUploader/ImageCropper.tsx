import React, { useMemo, useState } from 'react'

import styled from '@emotion/styled'
import { css, SerializedStyles } from '@emotion/react'
import EasyCropper, { MediaSize, Area, Size } from 'react-easy-crop'

import Form from '../../hocs/Form'
import Column from '../../layout/Column'
import Button from '../../atoms/Button'
import { blobToFile, getCroppedImg } from '../../../utils/getCroppedImg'
import { UIElementSizesEnum, UIElementShapeEnum } from '../../ts'
import Spacer from '../../layout/Spacer'

interface Props {
  name: string
  shape: UIElementShapeEnum
  styles?: SerializedStyles | string
  nextButtonText: string
  cancelButtonText: string
  loading: boolean
  size: Size
  handleOnCancel: () => void
  handleSubmit: () => void
}

const defaultProps: Partial<Props> = {
  name: '',
  styles: '',
  handleOnCancel() { },
  handleSubmit() { },
  loading: false,
}

function ImageCropper(props: Props) {
  const {
    name,
    shape,
    styles,
    handleSubmit,
    handleOnCancel,
    loading,
    size,
    nextButtonText,
    cancelButtonText,
  } = {
    ...defaultProps,
    ...props
  }

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [minZoom, setMinZoom] = useState(1)

  const { setValue, watch } = Form.useForm()

  const uploadedImageSrc: string = useMemo(() =>
    watch(name)?.[0] ? URL.createObjectURL(watch(name)?.[0]) : '', [
    watch(name)
  ])

  const cssContainerStyles = useMemo(() => containerStyles(styles), [
    styles,
  ])

  const handleMediaLoaded = ({ width, height }: MediaSize) => {
    const aspectRatio: number = width / height
    let newMinZoom: number

    if (aspectRatio >= 1) {
      // Image is landscape. Ensure height fills the crop area
      newMinZoom = size.height / height
    } else {
      // Image is portrait. Ensure width fills the crop area
      newMinZoom = size.width / width
    }

    setZoom(newMinZoom)
    setMinZoom(newMinZoom)
  }

  const handleZoomChange = (newZoom: number) => {
    setZoom(Math.max(newZoom, minZoom))
  }

  const onCropComplete = async (_: Area, croppedAreaPixels: Area) => {
    try {
      if (!croppedAreaPixels) return

      const { type: fileType, name: fileName } = watch(name)?.[0] || {}
      const aspectRatio: number = 1

      const croppedImageBlob: Blob = await getCroppedImg(
        uploadedImageSrc,
        croppedAreaPixels,
        aspectRatio,
        fileType
      )
      const croppedImageFile: File = blobToFile(croppedImageBlob, fileName)

      setValue('croppedImage', croppedImageFile)
    } catch (error) {
      console.error('Error cropping the image', error)
    }
  }

  return (
    <Column gap={25} styles={cssContainerStyles}>
      <CropperContainer size={size}>
        <EasyCropper
          image={uploadedImageSrc}
          crop={crop}
          zoom={zoom}
          aspect={size.width / size.height}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={handleZoomChange}
          cropSize={size}
          onMediaLoaded={handleMediaLoaded}
          showGrid={false}
          cropShape={shape}
          style={{
            cropAreaStyle: {
              border: 'none',
            }
          }}
        />
      </CropperContainer>

      <InputRangeStyles
        type='range'
        value={zoom}
        min={minZoom}
        max={3}
        step={0.1}
        aria-labelledby='Zoom'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setZoom(Number(e.target.value || minZoom))
        }}
      />

      <Spacer spaceType='margin' topSpace={50}>
        <Column gap={10}>
          <Button
            type='white'
            outlined
            width={`${size.width}px`}
            size={UIElementSizesEnum.Medium}
            onClick={handleSubmit}
            loading={loading}
            children={nextButtonText}
          />

          <Button
            type='white'
            outlined
            width={`${size.width}px`}
            size={UIElementSizesEnum.Medium}
            onClick={handleOnCancel}
            children={cancelButtonText}
            disabled={loading}
            styles={cssCancelButtonStyles}
          />
        </Column>
      </Spacer>

    </Column>
  )
}

const containerStyles = (inputStyles: SerializedStyles | string) => css`
  align-items: center;
  background-color: rbga(0, 0, 0, .15);
  ${inputStyles}
`

const CropperContainer = styled.div<{ size: Size }>`
  padding-top: 200px;
  position: relative;
  border-radius: 10px;
  overflow: hidden;

  ${({ size, theme }) => `
    width: ${size.width}px;
    height: ${size.height}px;
    background-color: ${theme?.colors?.FONT?.TITLE};
  `}
`

const InputRangeStyles = styled.input`
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
  width: 100%;

  &:focus {
    outline: none;
  }

  &::-webkit-slider-runnable-track {
    background-color: #8a8a8a;
    border-radius: 0px;
    height: 1px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    margin-top: -7px; /* Centers thumb on the track */
    background-color: #e0e0e0;
    border-radius: 15px;
    height: 15px;
    width: 15px;
  }

  &:focus::-webkit-slider-thumb {
    outline: 3px solid #e0e0e0;
    outline-offset: 0.125rem;
  }

  &::-moz-range-track {
    background-color: #8a8a8a;
    border-radius: 0px;
    height: 1px;
  }

  &::-moz-range-thumb {
    background-color: #e0e0e0;
    border: none; /*Removes extra border that FF applies*/
    border-radius: 15px;
    height: 15px;
    width: 15px;
  }

  &:focus::-moz-range-thumb{
    outline: 3px solid #e0e0e0;
    outline-offset: 0.125rem;
  }
`

const cssCancelButtonStyles = css`
  border: none;
`


export default ImageCropper
