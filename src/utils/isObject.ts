function isObject(o: unknown): boolean {
  return typeof o === 'object' && o !== null
}

export default isObject
