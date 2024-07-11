import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes, { InferProps } from 'prop-types'

import styled from '@emotion/styled'

import InputFeedback from '../hocs/InputFeedback'
import Icon from './Icon'
import useOutsideClick from '../../hooks/useOutsideClick'
import Form from '../hocs/Form'
import { capitalize, getFormFieldsErrors, hexToRGBA } from '../../utils'
import { UIElementSizesEnum } from '../ts/enums/UIElementSizesEnum'

const propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf<UIElementSizesEnum>(Object.values(UIElementSizesEnum)),
  withBorder: PropTypes.bool,
  options: PropTypes.array,
  doNotShowFeedback: PropTypes.bool,
}

type Props = InferProps<typeof propTypes>

const defaultProps = {
  size: UIElementSizesEnum.Large,
}

type Option = {
  label: string
  value: string
}

function SelectComponent({
  name,
  placeholder,
  options,
  disabled,
  defaultValue,
  doNotShowFeedback,
  ...props
}: Props) {
  const [selectedOption, setSelectedOption] = useState<Option>()
  const [showOptions, setShowOptions] = useState<boolean>(false)

  const { register, formState: { errors }, setValue } = Form.useForm()
  const ref = useRef(null)

  const fieldError = getFormFieldsErrors(errors, name)

  const handleShowOptions = useCallback(() => {
    if (disabled) return

    setShowOptions(!showOptions)
  }, [disabled, showOptions])

  const handleSetOption = ({ label, value }: Option) => {
    const newOption = {
      label: String(label || ''),
      value: String(value || '')
    }

    handleShowOptions()
    setSelectedOption(newOption)
    setValue(name, newOption.value)
  }

  useOutsideClick(ref, handleShowOptions, showOptions)

  useEffect(() => {
    if (Boolean(defaultValue)) {
      setSelectedOption(options?.find(({ value }) => String(value) === String(defaultValue)))
    }
  }, [defaultValue])

  const { label, value } = selectedOption || {}

  const Container: React.FC<any> = useMemo(
    () => (doNotShowFeedback ? Wrapper : InputFeedback),
    [doNotShowFeedback]
  )

  return (
    <Container {...props} errors={fieldError} hasError={Boolean(fieldError?.message)} name={name}>
      <Wrapper ref={ref}>
        <HiddenInput
          readOnly
          value={value}
          name={name}
          id={name}
          {...(register(name) as any)}
        />
        <SelectedValueRendering
          {...props}
          disabled={disabled}
          hasError={Boolean(fieldError?.message)}
          onClick={handleShowOptions}
        >
          <p>{capitalize(label || placeholder)}</p>
          <Icon
            name={`expand_${showOptions ? 'less' : 'more'}`}
            size={22}
            color="black"
          />
        </SelectedValueRendering>
        {showOptions && (
          <OptionsContainer>
            {options?.map((option) => (
              <OptionItem
                key={option?.value}
                onClick={() => handleSetOption(option)}
              >
                {capitalize(option?.label)}
              </OptionItem>
            ))}
          </OptionsContainer>
        )}
      </Wrapper>
    </Container>
  )
}

const Wrapper = styled.div`
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

const SelectedValueRendering = styled.div<Partial<Props & any>>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  padding: 0 15px;
  cursor: pointer;

  background-color: ${({ theme }) => theme.colors.NEUTRAL.CARD};
  color: ${({ readOnly, disabled, theme }) =>
    hexToRGBA(theme?.colors.FONT.TITLE, readOnly || disabled ? 0.65 : 1)};

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
    if (size === UIElementSizesEnum.Small) return 'height: 35px;'

    if (size === UIElementSizesEnum.Medium) return 'height: 42px;'

    if (size === UIElementSizesEnum.Large) return 'height: 50px;'
  }}
`

const OptionsContainer = styled.ul<any>`
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.NEUTRAL.CARD};
  border: 1px solid
    ${({ theme }: any) => hexToRGBA(theme.colors.NEUTRAL.SELECTED, 0.5)};
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
    hexToRGBA(theme.colors.MAIN.PRIMARY, 0.04)};
  }
`

SelectComponent.propTypes = propTypes
SelectComponent.defaultProps = defaultProps

export default SelectComponent
