function capitalize(value: string): string {
  const phrase: string = String(value ?? '')

  return phrase.charAt(0).toUpperCase() + phrase.slice(1)
}

export default capitalize
