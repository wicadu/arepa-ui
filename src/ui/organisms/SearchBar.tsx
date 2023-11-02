import React, { useCallback, useMemo } from 'react'
import PropTypes, { InferProps } from 'prop-types'

import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'

import Input from '../atoms/Input'
import Icon from '../atoms/Icon'
import Box from '../atoms/Box'
import Typography from '../atoms/Typography'
import Button from '../atoms/Button'
import Form from '../hocs/Form'

const propTypes = {
  ...Input.propTypes,
  loading: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  onClick: PropTypes.func
}

const defaultProps: Props = {
  ...Input.defaultProps,
  loading: false,
  children: null,
  onClick: null
}

type Props = InferProps<typeof propTypes>

function SearchBar ({ name, loading, children, onClick, ...restOfProps }: Props) {
  const { colors }: any = useTheme()

  const { control, setValue } = Form.useForm()
  const value = Form.useWatch({ control, name, defaultValue: '' })

  const onClear = useCallback(() => setValue(name, ''), [setValue, name])

  const thereAreItems = useMemo(() => React.Children.toArray(children).length, [children])

  return (
    <Container>
      <Input withBorder name={name} {...restOfProps} />
      <Icon name={`fas fa-${value?.length ? 'times' : 'search'}`} size={18} color={colors.NEUTRAL.SELECTED} onClick={onClear} />

      {value?.length > 3 && (
        <ListContainer>
          {thereAreItems
            ? children
            : <div>
                <Typography size={16} weight={700}>Sin coincidencias</Typography>
                <Typography type='description' size={14}>No hemos encontrado ninguna coincidencia</Typography>
              </div>
          }

          {Boolean(onClick) && (
            <Button type='link' onClick={onClick}>Agregar manualmente</Button>
          )}
        </ListContainer>
      )}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  z-index: 9;

  input, i {
    z-index: 2;
  }

  .fas.fa-search, .fas.fa-times {
    position: absolute;
    top: 15px;
    right: 15px;
  }
`

const ListContainer = styled(Box)`
  padding-top: 25px;
  display: grid;
  gap: 10px;
  max-height: 350px;
  border-radius: 0 0 10px 10px;
  border: 1px solid ${({ theme }) => theme.colors.NEUTRAL.SELECTED};
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  overflow: auto;
`

SearchBar.propTypes = propTypes
SearchBar.defaultProps = defaultProps

export default SearchBar
