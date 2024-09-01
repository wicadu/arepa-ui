import React, { useMemo } from 'react'

import { css, useTheme } from '@emotion/react'
import styled from '@emotion/styled'

import Typography from '../atoms/Typography'
import Icon from '../atoms/Icon'
import Image from '../atoms/Image'
import Alert from '../molecules/Alert'
import StatusChip from '../molecules/StatusChip/StatusChip'
import Pricing from '../molecules/Pricing'
import Column from '../layout/Column'
import Row from '../layout/Row'
import { UIElementStatusEnum } from '../ts/enums/UIElementStatusEnum'
import { UIElementSizesEnum } from '../ts/enums/UIElementSizesEnum'
import { dateFormat } from '../../utils'

const statusAsTypes = {
  prepared: 'info',
  picked: 'success',
  delivered: 'success',
  canceled: 'error',
  drafting: 'info',
}

type AlertProps = {
  type: UIElementStatusEnum
  title: string
  description: string
}

type PriceProps = {
  currencyCode: string
  amount: number
}

interface Props {
  id: number
  date: string
  status: string
  docs: string[]
  price: PriceProps
  totalOfItems: number
  items: string[]
  users: string[]
  alert?: AlertProps
  onClick: () => void
}

function OrderSnapshot({
  id,
  date,
  status,
  alert,
  docs,
  price,
  items,
  users,
  totalOfItems,
  onClick
}: Props) {
  const { colors } = useTheme()

  const statusAsAlert: boolean = useMemo(() => !!Object.values(alert || {})?.length, [
    alert
  ])

  const remainingTotalOfItems: number = useMemo(() => totalOfItems - items?.length, [
    totalOfItems,
    items?.length
  ])

  const doContainsDocs: boolean = useMemo(() => Boolean(docs?.length), [docs])

  return (
    <Column gap={10} onClick={onClick}>
      <Alert
        size={UIElementSizesEnum.Small}
        type={alert?.type}
        title={alert?.title}
        description={alert?.description}
        show={statusAsAlert}
      />

      <Row align='space-between' styles={cssHeaderStyles}>
        {!statusAsAlert ? (
          <StatusChip
            type={statusAsTypes[status]}
            text={String(id)}
            textColor={colors.FONT.TITLE}
            textSize={16}
            iconSize={15}
          />
        ) : (
          <Typography weight={700} size={16}>{String(id)}</Typography>
        )}

        <Typography
          type='description'
          size={12}
          children={dateFormat(date, { language: 'es-CL', withHours: true })}
        />
      </Row>

      <Row align='space-between'>
        <Row gap={10} styles={cssItemsStyles}>
          <Row gap={5}>
            {items?.map((image, index) => image
              ? <Image
                src={image}
                key={index}
                width={50}
                height={50}
              />
              : <Icon
                name='image'
                key={index}
                size={50}
                withBackground={0.65}
              />
            )}
          </Row>

          <TotalOfRemainingItems
            type='description'
            size={16}
            show={remainingTotalOfItems > 0}
            children={`+${remainingTotalOfItems}`}
          />
        </Row>

        <UsersContainer>
          {users?.map((image, index) => image
            ? <ImageContainer position={index} key={index}>
              <Image
                src={image}
                width={35}
                height={35}
                rounded={100}
              />
            </ImageContainer>
            : <DefaultProfileImage
              name='person'
              key={index}
              size={15}
              color='white'
              position={index}
            />
          )}
        </UsersContainer>
      </Row>

      <Row
        gap={15}
        align={doContainsDocs ? 'space-between' : 'right'}
        styles={cssBottomStyles}
      >
        {doContainsDocs && (
          <Column gap={5}>
            <Typography
              type='helper'
              weight={700}
              size={12}
              children={`Documentos adicionales (${docs?.length})`}
            />

            <Typography numberOfLines={1} children={docs} size={15} />
          </Column>
        )}

        <Column gap={5}>
          <Typography
            type='helper'
            weight={700}
            size={12}
            align='right'
            children='Total'
          />
          <Pricing
            weight={700}
            size={16}
            currencyCode={price?.currencyCode}
            currencySize={10}
            amount={price?.amount}
            align='right'
          />
        </Column>
      </Row>
    </Column>
  )
}

const cssHeaderStyles = css`
  @media screen and (min-width: 768px) {
    span.material-icons {
      font-size: 20px;
      padding: 4px;
    }

    p[type="default"] {
      font-size: 22px !important;
    }
    p[type="description"] {
      font-size: 18px !important;
    }
  }
`

const cssItemsStyles = css`
  @media screen and (min-width: 768px) {
    gap: 15px;
    padding-top: 5px;

    span.material-icons, p[type="description"] {
      font-size: 18px;
      width: 65px;
      height: 65px;
    }

    img {
      width: 65px;
      height: 65px;
    }
  }
`

const UsersContainer = styled.div`
  position: relative;
  width: 35px;
  height: 35px;

  @media screen and (min-width: 768px) {
    width: 42px;
    height: 42px;
  }
`

const userProfileStyles = (position: number) => css`
  z-index: ${3 - position};
  left: -${10 * position}px;
  top: -${10 * position}px;

  @media screen and (min-width: 768px) {
    img {
      width: 42px;
      height: 42px;
    }

    width: 42px;
    height: 42px;
    left: -${15 * position}px;
    top: -${15 * position}px;
  }
`

const ImageContainer = styled.figure <{ position: number }>`
  position: absolute;
  ${({ position }) => userProfileStyles(position)}
`

const DefaultProfileImage = styled(Icon) <{ position: number }>`
  background-color: ${({ theme }) => theme.colors.FONT.HELPER};
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 35px;
  user-select: none;
  position: absolute;

  ${({ position }) => userProfileStyles(position)}
`

const TotalOfRemainingItems = styled(Typography) <{ show: boolean }>`
  width: 45px;
  height: 45px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.NEUTRAL.SIDE};

  ${({ show }) => !show && 'display: none;'}
`

const cssBottomStyles = css`
  @media screen and (min-width: 768px) {
    p[type="helper"] {
      font-size: 16px;
    }

    div:first-of-type > p[type="default"] {
      font-size: 18px !important;
    }

    div:last-of-type > p[type="default"] {
      font-size: 22px !important;

      &::after {
        font-size: 16px;
      }
    }
  }
`


export default OrderSnapshot
