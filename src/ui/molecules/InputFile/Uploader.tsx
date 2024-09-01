import React, { Fragment, useEffect, useRef } from 'react'

import styled from '@emotion/styled'
import { SerializedStyles, useTheme } from '@emotion/react'

import { hexToRGBA } from '../../../utils'
import getBordersStyles, { BorderTypes } from '../../../utils/getBordersStyles'
import Typography from '../../atoms/Typography'
import Icon from '../../atoms/Icon'

interface Props {
  disabled: boolean,
  onChange: (file: File) => void,
  width: string,
  accept: string
  styles?: SerializedStyles | string
  loadedFile?: File
}

const defaultProps: Partial<Props> = {
  disabled: false,
  width: '100%',
  loadedFile: null
}

function InputFileUploader({
  width,
  accept,
  disabled,
  onChange,
  styles,
  loadedFile
}: Props) {
  const { colors } = useTheme()
  const inputRef: React.MutableRefObject<any> = useRef()

  const onLoadFileDialog = () => {
    if (disabled) return
    inputRef?.current?.click()
  }

  useEffect(() => {
    if (!Boolean(loadedFile)) {
      if (inputRef?.current) inputRef.current.value = ''
    }
  }, [loadedFile])

  return (
    <Fragment>
      <Uploader width={width} onClick={onLoadFileDialog} styles={styles}>
        <Icon name='upload' size={30} color={colors.MAIN.PRIMARY} />
        <div>
          <Typography size={12} weight={700} color={colors.MAIN.PRIMARY}>Subir archivo</Typography>
          <Typography size={10} color={colors.MAIN.PRIMARY}>Tamaño máximo: 2 mb</Typography>
        </div>
      </Uploader>

      <HiddenInput
        ref={inputRef}
        type='file'
        accept={accept}
        onChange={(event: any) => {
          if (event.target.files && event.target.files[0]) {
            onChange?.(event.target.files[0])
          }
        }}
      />
    </Fragment>
  )
}

const HiddenInput = styled.input`
  display: none;
`

const Uploader = styled.div<Partial<Props>>`
  width: ${({ width }) => width};
  padding: 15px 10px;
  display: flex;
  justify-content: center;
  gap: 10px;
  border-radius: 7px;
  cursor: pointer;

  background: ${({ theme }) => hexToRGBA(theme.colors.MAIN.PRIMARY, 0.1)};
  ${({ theme }) => getBordersStyles(1, BorderTypes.Dashed, theme.colors.MAIN.PRIMARY)}

  @media screen and (min-width: 678px) {
    width: 100%;
    padding: 15px 25px;

    div {
      display: flex;
      width: 100%;
      justify-content: space-between;
    }

    p:first-of-type {
      font-size: 14px;
    }

    p:last-of-type {
      font-size: 12px;
    }
  }

  ${({ styles }) => styles}
`

InputFileUploader.defaultProps = defaultProps

export default InputFileUploader
