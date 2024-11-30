import React, { useMemo } from 'react'

import styled from '@emotion/styled'
import { css } from '@emotion/react'

import { capitalize, isBrowser } from '../../utils'
import Icon from '../atoms/Icon'
import Row from '../layout/Row'
import Typography from '../atoms/Typography'

type Route = {
  name: string
  path: string
}

interface Props {
  routes?: Route[]
  names?: Record<string, string>
  segmentDelimiter?: string
  offset?: number
  limit?: number
  navigate: (to: string, params?: Record<string, unknown>) => void
}

const defaultProps: Partial<Props> = {
  routes: [],
  segmentDelimiter: '-',
  offset: 0,
  limit: undefined,
  navigate(to: string) {
    window.location.href = to
  },
}

function Breadcrumbs(props: Props) {
  const { routes, names, offset, limit, segmentDelimiter, navigate } = {
    ...defaultProps,
    ...props,
  }

  const pathname: string = isBrowser() ? window?.location?.pathname : ''

  const defaultRoutes: Route[] = useMemo(
    () =>
      pathname
        ?.split('/')
        ?.filter((segments: string) => segments?.length > 0)
        ?.slice(offset, limit)
        ?.map((path: string) => ({
          path: `${pathname?.split(path)?.[0]}${path}`,
          name: capitalize(
            names?.[path] || path?.replace(segmentDelimiter, ' ')
          ),
        })),
    [pathname, names, offset, limit]
  )

  const routesToRender: Route[] = useMemo(
    () => (routes?.length > 0 ? routes : defaultRoutes),
    [routes, defaultRoutes]
  )

  const navigateTo = (path: string) => {
    if (pathname === path) return
    navigate(path)
  }

  return (
    <Container>
      {routesToRender?.map(({ path, name }: Route) => (
        <Row key={path} gap={4} onClick={() => navigateTo(path)}>
          <Typography
            size={11}
            lineHeight={11}
            type="description"
            children={name}
            styles={cssItemStyles}
          />
          <Icon name="arrow_forward_ios" size={8} />
        </Row>
      ))}
    </Container>
  )
}

const Container = styled.nav`
  display: flex;
  gap: 10px 4px;
  flex-wrap: wrap;
`

const cssItemStyles = css`
  cursor: pointer;
  min-height: 15px;
  align-items: center;
  display: flex;

  @media screen and (min-width: 768px) {
    font-size: 13px !important;
    line-height: 13px !important;
  }
`

export default Breadcrumbs
