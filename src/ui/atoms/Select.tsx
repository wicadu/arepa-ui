import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes, { InferProps } from 'prop-types'

import styled from '@emotion/styled'

import InputFeedback from '../hocs/InputFeedback'
import Icon from './Icon'
import hexToRbga from '../../utils/hexToRGBA'
import useOutsideClick from '../../hooks/useOutsideClick'
import Form from '../hocs/Form'
import { InputSizesEnum } from '../ts/enums/InputSizesEnum'

const propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf<InputSizesEnum>(Object.values(InputSizesEnum)),
  withBorder: PropTypes.bool,
  options: PropTypes.array,
}

type Props = InferProps<typeof propTypes>

const defaultProps = {
  size: InputSizesEnum.large,
}

function SelectComponent({
  name,
  placeholder,
  options,
  disabled,
  defaultValue,
  ...props
}: Props) {
  const [selectedOption, setSelectedOption] = useState()
  const [showOptions, setShowOptions] = useState<boolean>(false)

  const { register, errors } = Form.useForm()
  const ref = useRef(null)

  const hasError = useMemo(
    () => errors[name]?.message?.length,
    [errors[name]?.message]
  )

  const handleShowOptions = useCallback(() => {
    if (disabled) return

    setShowOptions(!showOptions)
  }, [disabled, showOptions])

  const handleSetOption = useCallback(
    (option) => {
      handleShowOptions()
      setSelectedOption(option)
    },
    [handleShowOptions]
  )

  useOutsideClick(ref, handleShowOptions, showOptions)

  useEffect(() => {
    if (Boolean(defaultValue)) {
      setSelectedOption(options?.find(({ value }) => value === defaultValue))
    }
  }, [])

  const { label, value } = selectedOption || {}

  return (
    <InputFeedback {...props} hasError={hasError} name={name}>
      <Wrapper ref={ref}>
        <HiddenInput
          readOnly
          ref={register()}
          value={value}
          name={name}
          id={name}
        />
        <SelectedValueRendering
          {...props}
          disabled={disabled}
          hasError={hasError}
          onClick={handleShowOptions}
        >
          <p>{label || placeholder}</p>
          <Icon
            name={`expand_${showOptions ? 'less' : 'more'}`}
            size={22}
            color='black'
          />
        </SelectedValueRendering>
        {showOptions && (
          <OptionsContainer>
            {options?.map((option) => (
              <OptionItem
                key={option?.value}
                onClick={() => handleSetOption(option)}
              >
                {option?.label}
              </OptionItem>
            ))}
          </OptionsContainer>
        )}
      </Wrapper>
    </InputFeedback>
  )
}

const Wrapper = styled.div<any>`
  position: relative;
  webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

const HiddenInput = styled.input`
  display: none;
`

const SelectedValueRendering = styled.div<any>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  padding: 0 15px;
  cursor: pointer;

  background-color: ${({ theme }) => theme.colors.NEUTRAL.CARD};
  color: ${({ readOnly, disabled, theme }) =>
    hexToRbga(theme?.colors.FONT.TITLE, readOnly || disabled ? 0.65 : 1)};

  border: 1px solid
    ${({ theme, withBorder }) =>
      withBorder
        ? theme.colors.NEUTRAL.SELECTED
        : theme.colors.NEUTRAL.TRANSPARENT};

  ${({ theme, hasError }) =>
    hasError && `border: 1px solid ${theme.colors.MAIN.ERROR};`}

  ${({ width }) => width && `width: ${width};`}

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    display: none;
    -webkit-appearance: none;
    margin: 0;
  }

  ${({ size }) => {
    if (size === InputSizesEnum.small) return 'height: 35px;'

    if (size === InputSizesEnum.medium) return 'height: 42px;'

    if (size === InputSizesEnum.large) return 'height: 50px;'
  }}
`

const OptionsContainer = styled.ul<any>`
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.NEUTRAL.CARD};
  border: 1px solid
    ${({ theme }: any) => hexToRbga(theme.colors.NEUTRAL.SELECTED, 0.5)};
  max-height: 350px;
  position: absolute;
  left: 0;
  right: 0;
  overflow: auto;
  z-index: 1;
`

const OptionItem = styled.li<any>`
  cursor: pointer;
  padding: 10px 15px;

  &:hover {
    border-radius: 5px;
    background-color: ${({ theme }) =>
      hexToRbga(theme.colors.MAIN.PRIMARY, 0.04)};
  }
`

SelectComponent.propTypes = propTypes
SelectComponent.defaultProps = defaultProps

export default SelectComponent
