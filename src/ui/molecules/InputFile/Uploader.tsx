import React, { Fragment, useRef } from 'react'

import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'

import { hexToRGBA } from '../../../utils'
import getBordersStyles, { BorderTypes } from '../../../utils/getBordersStyles'
import Form from '../../hocs/Form'
import Typography from '../../atoms/Typography'
import Icon from '../../atoms/Icon'

interface Props {
  component: React.ReactNode,
  disabled: boolean,
  onChange: (file: File) => void,
  width: string,
  accept: string
}

const defaultProps: Partial<Props> = {
  disabled: false,
  width: '100%'
}

function InputFileUploader({
  width,
  accept,
  component,
  disabled,
  onChange,
}: Props): JSX.Element {
  const { colors } = useTheme()
  const inputRef: React.MutableRefObject<any> = useRef()
  const { formState: { errors } } = Form.useForm()

  const onLoadWindowToUploadPicture = () => {
    if (disabled) return

    inputRef?.current?.click()
  }

  return (
    <Fragment>
      {component
        ? React.cloneElement(component as React.ReactElement, { onClick: onLoadWindowToUploadPicture })
        : (
          <Uploader width={width} onClick={onLoadWindowToUploadPicture}>
            <Icon name='upload' size={35} color={colors.MAIN.PRIMARY} />
            <div>
              <Typography size={14} weight={700} color={colors.MAIN.PRIMARY}>Subir archivo</Typography>
              <Typography size={12} color={colors.MAIN.PRIMARY}>Tamaño máximo: 2 mb</Typography>
            </div>
          </Uploader>
        )}

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
  padding: 20px 10px;
  display: flex;
  justify-content: center;
  gap: 10px;
  border-radius: 7px;

  background: ${({ theme }) => hexToRGBA(theme.colors.MAIN.PRIMARY, 0.1)};
  ${({ theme }) => getBordersStyles(1, BorderTypes.Dashed, theme.colors.MAIN.PRIMARY)}
`

InputFileUploader.defaultProps = defaultProps

export default InputFileUploader
