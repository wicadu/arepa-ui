import React, { Fragment, useMemo } from 'react'
import PropTypes, { InferProps } from 'prop-types'

import styled from '@emotion/styled'

import Icon from '../atoms/Icon'
import Typography from '../atoms/Typography'

const propTypes = {
  steps: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    icon: PropTypes.string
  })).isRequired,
  currentStep: PropTypes.number
}

const defaultProps = {
  steps: [],
  currentStep: null
}

type Props = InferProps<typeof propTypes>

function Stepper ({ steps, currentStep }: Props) {
  const arrSteps = useMemo(() => steps?.map((step, index) => ({ ...step, id: index + 1 })), [steps])

  return (
    <Container>
      {arrSteps?.map(({ name, icon, id }) => (
        <Fragment>
          <Step didItGetToThisPosition={currentStep >= id}>
            <Icon name={icon} size={23} />
            <Typography size={11.5}>{id}. {name}</Typography>
          </Step>
          {steps?.length > id && <Line currentStep={currentStep} stepNumber={id} />}
        </Fragment>
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
`

const Step = styled.div`
  display: grid;
  justify-items: center;

  i, p {
    color: ${({ theme, didItGetToThisPosition }) => didItGetToThisPosition
      ? theme.colors.MAIN.PRIMARY
      : theme.colors.FONT.DESCRIPTION
    };
  }
  
`

const Line = styled.div`
  width: 60px;
  height: 2px;
  background: ${({ theme, currentStep, stepNumber }) => {
    const { colors } = theme

    if (currentStep > stepNumber) return colors.MAIN.PRIMARY
    if (currentStep === stepNumber) return `linear-gradient(90deg, ${colors.MAIN.PRIMARY} 50%, ${colors.NEUTRAL.SELECTED} 50%)`

    return colors.NEUTRAL.SELECTED
  }}
`

Stepper.propTypes = propTypes
Stepper.defaultProps = defaultProps

export default Stepper
