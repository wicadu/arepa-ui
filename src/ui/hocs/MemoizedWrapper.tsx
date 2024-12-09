import { memo, ReactElement } from 'react'

interface Props {
  children: ReactElement
}

const MemoizedWrapper = memo(({ children }: Props) => {
  return children
})

export default MemoizedWrapper
