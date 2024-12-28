/**
 * Retrieves a value from a nested object based on a string path.
 *
 * This function allows you to access deeply nested fields in an object
 * using a dot and bracket notation string.
 *
 * @param {object} object - The object to retrieve the value from.
 * @param {string} path - The path string representing the nested field to access.
 * @returns {any} The value found at the given path, or `undefined` if the path is invalid.
 */
function getObjectField(object: Record<string, any>, path: string): any {
  const keys: string[] = path?.split('.').map((key) => {
    if (key.includes('[')) {
      const [name] = key.split(/\[|\]/).filter(Boolean)
      return name
    } else {
      return key
    }
  })

  let value = object ?? {}

  for (const key of keys) {
    if (typeof key === 'string') {
      value = value[key]
    } else if (typeof key === 'object' && key.hasOwnProperty('index')) {
      value = value[key.name][key.index]
    }

    if (value === undefined || value === null) {
      break
    }
  }

  return value
}

export default getObjectField
