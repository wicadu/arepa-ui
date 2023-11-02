import React, { useCallback, useState, useRef, useMemo, useEffect } from 'react'
import PropTypes, { InferProps } from 'prop-types'
import styled from '@emotion/styled'
import Image from '../atoms/Image'
import Icon from '../atoms/Icon'
import Button from '../atoms/Button'
import Typography from '../atoms/Typography'
import Form from '../hocs/Form'
import Alert from '../molecules/Alert'
import { Spin } from '..'

const { useForm } = Form

const propTypes = {
  name: PropTypes.string.isRequired,
  imageWidth: PropTypes.number,
  imageHeight: PropTypes.number,
  defaultIcon: PropTypes.string,
  defaultImage: PropTypes.string,
  onLoadSubmit: PropTypes.func,
  loadingLoadSubmit: PropTypes.bool,
  onDelete: PropTypes.func,
  loadingDelete: PropTypes.bool,
  helperText: PropTypes.string,
  hidden: PropTypes.bool,
}

type Props = InferProps<typeof propTypes>
function ImageUploader ({
  name,
  defaultImage,
  imageWidth,
  imageHeight,
  defaultIcon,
  onLoadSubmit,
  loadingLoadSubmit,
  onDelete,
  loadingDelete,
  helperText,
  hidden,
}: Props) {
  const [image, setImage] = useState(defaultImage)
  const [editing, setEditing] = useState(false)
  const { register, getValues, errors, reset } = useForm()
  const hiddenInputFilePickerRef = useRef(null)
  const isNewStoreImageLoaded = useMemo(() =>
    getValues(name)?.length > 0, [
      getValues(name)?.length,
    ]
  )

  useEffect(() => {
    if (!hidden) {
      setEditing(false)
      reset()
      setImage(defaultImage)
    }
  }, [hidden])

  useEffect(() => {
    setImage(defaultImage)
  }, [defaultImage])

  const loading = useMemo(() =>
    loadingLoadSubmit || loadingDelete, [
      loadingLoadSubmit,
      loadingDelete,
  ])

  const handleStartEditing = useCallback(() => {
    setEditing(true)
  }, [setEditing])

  const handleOnDelete = useCallback(() => {
    if (loading) return

    if (isNewStoreImageLoaded) {
      setImage(defaultImage)
      reset()
    } else {
      onDelete()
    }
  }, [
    loading,
    isNewStoreImageLoaded,
    setImage,
    defaultImage,
    reset,
    onDelete,
  ])

  const handleOnLoad = useCallback(() => {
    if (loading) return

    if (isNewStoreImageLoaded)
      onLoadSubmit()
    else
      hiddenInputFilePickerRef.current.click()
  }, [
    loading,
    isNewStoreImageLoaded,
    onLoadSubmit,
    hiddenInputFilePickerRef,
  ])

  const handleOnChangeImage = useCallback((event) => {
    const { files } = event?.target || {}

    if (files?.[0]) setImage(URL.createObjectURL(files?.[0]))
  }, [setImage])

  const hasError = useMemo(
    () => errors[name]?.message,
    [errors[name]?.message]
  )

  return (
    <Container>
      <ContainerImage>
        {Boolean(image && (!editing || isNewStoreImageLoaded)) && (
          <DeleteIconContainer onClick={handleOnDelete}>
            {loadingDelete ?
              <Spin size={10} type='white' /> :
              <Icon name='delete_forever' size={10} color='white' />
            }
          </DeleteIconContainer>
        )}

        <Image
          src={image}
          width={imageWidth}
          height={imageHeight}
          noPictureIcon={defaultIcon}
        />

        {Boolean(!editing && !loadingDelete) && (
          <EditIconContainer onClick={handleStartEditing}>
            <Icon name='edit' size={10} color='white' />
          </EditIconContainer>
        )}
      </ContainerImage>

      {editing && (
        <>
          <Button
            type='white'
            outlined
            size='medium'
            onClick={handleOnLoad}
            loading={loadingLoadSubmit}
          >
            {isNewStoreImageLoaded ? 'Confirmar': 'Seleccionar imagen'}
          </Button>

          {helperText && <TextHelper type='helper' color='white'>{helperText}</TextHelper>}
        </>
      )}

      {
        Boolean(editing && hasError) && (
        <StyledAlert
            noClose
            show
            type='ERROR'
            title={errors[name].type}
            message={errors[name].message}
          />
        )
      }

      <HiddenInputFilePicker
        type='file'
        name={name}
        accept='image/*'
        onChange={handleOnChangeImage}
        ref={e => {
          register(e)
          hiddenInputFilePickerRef.current = e;
        }}
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

const TextHelper = styled(Typography)`
  margin-top: 50px;

  @media screen and (min-width: 768px) {
    font-size: 16px;
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

const StyledAlert = styled(Alert)`
  margin-top: 62px;

  @media screen and (min-width: 768px) {
    margin-top: 80px;
  }
`

ImageUploader.propTypes = propTypes

export default ImageUploader
