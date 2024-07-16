import { forwardRef, ReactElement, cloneElement } from 'react'

interface Props {
  children: ReactElement
}

const RefForwarding = forwardRef<HTMLElement, Props>(({ children }, ref) => {
  return cloneElement(children, { forwardedRef: ref })
})

export default RefForwarding