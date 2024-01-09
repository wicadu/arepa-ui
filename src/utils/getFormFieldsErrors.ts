function getFormFieldsErrors(errors = {}, name = '') {
  const keys = name.split('.').map((key) => {
    if (key.includes('[')) {
      const [name] = key.split(/\[|\]/).filter(Boolean)
      return name
    } else {
      return key
    }
  })

  let value = errors

  for (const key of keys) {
    if (typeof key === 'string') {
      value = value[key]
    } else if (typeof key === 'object' && key.hasOwnProperty('index')) {
      value = value[key.name][key.index]
    }

    if (value === undefined || value === null) {
      break // Stop if a property in the path is undefined or null
    }
  }

  return value
}

export default getFormFieldsErrors
