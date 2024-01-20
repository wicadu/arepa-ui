function getErrorMessage(error: string | null, translate: any) {
  if (error === null || error === undefined) return

  return (
    translate['es'].ERROR[error?.toLocaleUpperCase()] ||
    translate['es'].ERROR.DEFAULT
  )
}

export default getErrorMessage
