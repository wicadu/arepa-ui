import React, { useCallback, useState, useRef, useMemo, useEffect } from 'react'

import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'

import Image from '../atoms/Image'
import Icon from '../atoms/Icon'
import Spin from '../atoms/Spin'
import Button from '../atoms/Button'
import Typography from '../atoms/Typography'
import Form from '../hocs/Form'
import Alert from '../molecules/Alert'
import Column from '../layout/Column'
import Spacer from '../layout/Spacer'
import { UIElementStatusEnum } from '../ts/enums/UIElementStatusEnum'
import { UIElementSizesEnum } from '../ts/enums/UIElementSizesEnum'

interface Props {
  name: string
  imageWidth?: number
  imageHeight?: number
  defaultImage?: string
  onLoadSubmit?: () => void
  loadingLoadSubmit?: boolean
  onDelete?: () => void
  loadingDelete?: boolean
  helperText?: string
  hidden?: boolean
}

const defaultProps: Partial<Props> = {
  name: '',
  imageHeight: 225,
  imageWidth: 225,
  defaultImage: '',
  onLoadSubmit(){},
  loadingLoadSubmit: false,
  onDelete(){},
  loadingDelete: false,
  helperText: '',
  hidden: false
}

function ImageUploader({
  name,
  defaultImage,
  imageWidth,
  imageHeight,
  onLoadSubmit,
  loadingLoadSubmit,
  onDelete,
  loadingDelete,
  helperText,
  hidden,
}: Props) {
  const [image, setImage] = useState(defaultImage)
  const [editing, setEditing] = useState(false)

  const { colors } = useTheme()
  const { getValues, formState: { errors }, setValue, reset } = Form.useForm()
  const hiddenInputRef = useRef<HTMLInputElement | null>(null)

  const isNewImageLoadedToForm = useMemo(() => getValues(name)?.length > 0, [
    getValues(name)?.length
  ])

  useEffect(() => {
    if (!hidden) {
      setEditing(false)
      reset()
      setImage(defaultImage)
      if (hiddenInputRef?.current) hiddenInputRef.current.value = '';
    }
  }, [hidden])

  useEffect(() => {
    setImage(defaultImage)
  }, [defaultImage])

  const loading = useMemo(() => loadingLoadSubmit || loadingDelete, [
    loadingLoadSubmit,
    loadingDelete,
  ])

  const handleStartEditing = useCallback(() => {
    setEditing(true)
  }, [setEditing])

  const handleOnDelete = useCallback(() => {
    if (loading) return

    if (isNewImageLoadedToForm) {
      setImage(defaultImage)
      reset()

      if (hiddenInputRef?.current) hiddenInputRef.current.value = '';
    } else {
      onDelete?.()
    }
  }, [
    loading,
    isNewImageLoadedToForm,
    setImage,
    defaultImage,
    reset,
    onDelete,
  ])

  const handleOnLoad = useCallback(() => {
    if (loading) return

    if (isNewImageLoadedToForm)
      onLoadSubmit()
    else
      hiddenInputRef?.current?.click()
  }, [
    loading,
    isNewImageLoadedToForm,
    onLoadSubmit,
    hiddenInputRef,
  ])

  const handleOnChangeImage = useCallback((event) => {
    const { files } = event?.target || {}

    if (files?.[0]) {
      setImage(URL.createObjectURL(files?.[0]))
      setValue(name, files)
    }
  }, [
    setImage,
    setValue,
    name
  ])

  const hasError = useMemo(() => errors?.[name]?.message, [errors?.[name]])

  return (
    <Container>
      <ContainerImage>
        {Boolean(image && (!editing || isNewImageLoadedToForm)) && (
          <DeleteIconContainer onClick={handleOnDelete}>
            {loadingDelete ?
              <Spin size={10} type='white' /> :
              <Icon name='delete_forever' size={10} color='white' />
            }
          </DeleteIconContainer>
        )}

        {Boolean(image?.length) ? (
          <Image
            src={image}
            width={imageWidth}
            height={imageHeight}
            fit='cover'
            rounded={10}
          />
        ) : (
          <Spacer
            spaceType='padding'
            verticalSpace={(imageHeight / 2) - 30}
            horizontalSpace={(imageWidth / 2) - 30}
            children={
              <Icon
                name='insert_photo'
                size={30}
                color={colors.FONT.CONTRAST}
              />
            }
          />
        )}

        {Boolean(!editing && !loadingDelete && !Boolean(defaultImage)) && (
          <EditIconContainer onClick={handleStartEditing}>
            <Icon name='edit' size={10} color='white' />
          </EditIconContainer>
        )}
      </ContainerImage>

      {editing && (
        <Column gap={20}>
          <Button
            type='white'
            outlined
            size={UIElementSizesEnum.Medium}
            onClick={handleOnLoad}
            loading={loadingLoadSubmit}
            children={isNewImageLoadedToForm ? 'Confirmar' : 'Seleccionar imagen'}
          />

          <Typography
            type='helper'
            color='white'
            align='center'
            children={helperText}
          />
        </Column>
      )}

      <Alert
        show={Boolean(editing && hasError)}
        type={UIElementStatusEnum.Error}
        title={errors?.[name]?.type as string}
        description={errors?.[name]?.message as string}
      />

      <HiddenInputFilePicker
        type='file'
        name={name}
        accept='image/*'
        onChange={handleOnChangeImage}
        ref={hiddenInputRef}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ContainerImage = styled.div`
  position: relative;
  margin-bottom: 50px;

  @media screen and (min-width: 768px) {
    & > div[width="200"] {
      width: 400px;
      height: 400px;
    }
  }
`

const DeleteIconContainer = styled.div`
  width: 23px;
  height: 23px;
  ${({ theme }) => `background-color: ${theme.colors.MAIN.ERROR};`}
  border-radius: 23px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -10px;
  right: -10px;
  cursor: pointer;
`

const EditIconContainer = styled.div`
  width: 23px;
  height: 23px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px dashed white;
  border-radius: 23px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: -10px;
  bottom: -10px;
  cursor: pointer;
`

const HiddenInputFilePicker = styled.input`
  display: none;
`

ImageUploader.defaultProps = defaultProps

export default ImageUploader
