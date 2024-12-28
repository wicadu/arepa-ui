import React, { useMemo } from 'react'

import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'

import Typography from '../../atoms/Typography'
import Row from '../../layout/Row'
import Pricing from '../../molecules/Pricing'

export type Spec = {
  key?: string
  value?: string | number
}

export type Price = {
  amount: number
  quantity: number
  currencyCode: string
}

interface Props {
  specs?: Spec[]
  price: Price
}

const defaultProps: Props = {
  specs: [],
  price: {} as Price,
}

function OrderItemSpecs(props: Props) {
  const { specs, price } = {
    ...defaultProps,
    ...props,
  }

  const { colors } = useTheme()

  const hasPrice: boolean = useMemo(
    () => !!Object.values(price || {})?.length,
    [price]
  )

  return hasPrice ? (
    <Row gap={5}>
      <Pricing
        size={14}
        weight={700}
        currencyCode={price?.currencyCode}
        amount={price?.amount || 0}
        currencySize={10}
        color={colors?.FONT.HELPER}
      />
      <Typography type="description" children="•" />
      <Pricing
        size={14}
        weight={700}
        currencyCode={price?.currencyCode}
        amount={(price?.quantity || 0) * (price?.amount || 0)}
        currencySize={10}
        color={colors?.FONT.HELPER}
      />
    </Row>
  ) : (
    <Row gap={0} align="space-between">
      {specs?.map(({ key, value }) => (
        <StyledTypography
          key={`${key}-${value}`}
          type="description"
          children={value}
          weight={700}
          size={14}
          data-order-item-spec={value}
          afterStyles={{
            content: ` ${key ?? ''}`,
            size: 10,
            weight: 300,
          }}
        />
      ))}
    </Row>
  )
}

const StyledTypography = styled(Typography)`
  @media screen and (min-width: 768px) {
    font-size: 18px;
    line-height: 22px;

    &::after {
      font-size: 16px;
    }
  }
`

export default OrderItemSpecs
