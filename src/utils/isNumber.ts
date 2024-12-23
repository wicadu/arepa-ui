function isNumber(number: unknown): boolean {
  return typeof number === 'number' && !Number.isNaN(number)
}

export default isNumber
