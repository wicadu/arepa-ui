import React from 'react'

import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'

import Icon from '../../atoms/Icon'
import Typography from '../../atoms/Typography'
import { getFileSize, hexToRGBA } from '../../../utils'

interface Props {
  file: File
  clearFile: () => void
}

const defaultProps: Partial<Props> = {
}

function FilesSummary({ file, clearFile }): JSX.Element {
  const { colors } = useTheme()

  return (
    <Container>
      <Content>
        <Icon name='attach_file' size={20} />
        <Typography weight={700}>{file?.name?.slice(-17)}</Typography>
        <Typography weight={700}>{file?.size ? `- ${getFileSize(file?.size)}` : ''}</Typography>
      </Content>

      {clearFile &&
        <Icon
          name='do_not_disturb_on'
          size={20}
          color={hexToRGBA(colors.MAIN.ERROR, 0.75)}
          onClick={clearFile}
        />
      }
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  height: 25px;
  padding-bottom: 5px;
  align-items: center;
  margin: 00px 0;
`

const Content = styled.span`
  display: flex;
  gap: 5px;
`

FilesSummary.defaultProps = defaultProps

export default FilesSummary
