import React, { useMemo } from 'react'

import styled from '@emotion/styled'
import { css, SerializedStyles, useTheme } from '@emotion/react'
import { Size } from 'react-easy-crop'

import Icon from '../../atoms/Icon'
import Typography from '../../atoms/Typography'
import Column from '../../layout/Column'
import { UIElementShapeEnum } from '../../ts'

interface Props {
  size: Size
  shape: UIElementShapeEnum
  inputStyles?: SerializedStyles | string
  inputLabel: string
  helperTexts?: string[]
  onLoad: () => void
}

const defaultProps: Partial<Props> = {
  inputStyles: '',
  inputLabel: '',
  helperTexts: [],
  onLoad() { }
}

function ImageInput(props: Props) {
  const { size, inputStyles, inputLabel, helperTexts, onLoad, shape } = {
    ...defaultProps,
    ...props
  }

  const { colors } = useTheme()

  const containerStyles = useMemo(() => cssContainerStyles(inputStyles), [
    inputStyles
  ])

  const helpersStyles = useMemo(() => cssHelpersStyles(size), [
    size
  ])

  return (
    <Column gap={25} styles={containerStyles}>
      <InputContainer onClick={onLoad} size={size} shape={shape}>
        <Icon name='image' size={24} color='white' />

        <Typography
          type='helper'
          color={colors.FONT.CONTRAST}
          align='center'
          children={inputLabel}
        />
      </InputContainer>

      <Column gap={10} styles={helpersStyles}>
        {helperTexts?.map((text: string, index: number) => (
          <Typography
            key={index}
            type='helper'
            color='white'
            align='center'
            children={text}
          />
        ))}
      </Column>
    </Column>
  )
}

const cssContainerStyles = (inputStyles: SerializedStyles | string) => css`
  align-items: center;
  background-color: rbga(0, 0, 0, .15);
  ${inputStyles}
`

const InputContainer = styled.div<{
  size: Size
  shape: UIElementShapeEnum
}>`
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  
  ${({ size, shape }) => {
    let styles = `
      width: ${size.width}px;
      height: ${size.height}px;
    `

    if (shape === UIElementShapeEnum.Rect) {
      styles += `
        border-radius: 10px;
      `
    } else if (shape === UIElementShapeEnum.Round) {
      styles += `
      border-radius: ${size.height}px;
    `
    }
    
    return styles
  }}
`

const cssHelpersStyles = (size: Size) => css`
  max-width: ${size?.width}px;
`


export default ImageInput
